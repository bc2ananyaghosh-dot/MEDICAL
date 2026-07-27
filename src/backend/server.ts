import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createZeroKnowledgeProof, ProofScholarWitness } from '../witness.js';
import { ProofScholarContract } from '../../contracts/managed/proof_scholar/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6300;

app.use(cors());
app.use(express.json());

const contractInstance = new ProofScholarContract();

// Initial dummy ledger data for explorer demonstration
contractInstance.registerCredential(
  '0x8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a',
  '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
  BigInt(Math.floor(Date.now() / 1000) - 86400)
);

contractInstance.registerCredential(
  '0x3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d',
  '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
  BigInt(Math.floor(Date.now() / 1000) - 3600)
);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    network: process.env.VITE_NETWORK || 'localnet',
    contractAddress: process.env.VITE_CONTRACT_ADDRESS || '0x4d69646e6967687450726f6f665363686f6c6172000000000000000000000001',
    proofServerUrl: process.env.VITE_PROOF_SERVER_URL || `http://localhost:${PORT}`,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/ledger', (req: Request, res: Response) => {
  const ledger = contractInstance.getLedger();
  res.json({
    success: true,
    ledger: {
      credentialCount: ledger.credentialCount.toString(),
      verificationCount: ledger.verificationCount.toString(),
      lastCredentialId: ledger.lastCredentialId,
      lastVerificationStatus: ledger.lastVerificationStatus,
      lastInstitutionHash: ledger.lastInstitutionHash,
      lastTimestamp: ledger.lastTimestamp.toString(),
      isRevoked: ledger.isRevoked,
    },
  });
});

app.post('/api/proof/generate', (req: Request, res: Response) => {
  try {
    const { witness, type } = req.body;
    if (!witness || !witness.author || !witness.research) {
      return res.status(400).json({ success: false, error: 'Invalid witness payload' });
    }

    const proofBlob = createZeroKnowledgeProof(witness as ProofScholarWitness, type || 'authorship');
    res.json({ success: true, proof: proofBlob });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/proof/verify', (req: Request, res: Response) => {
  try {
    const { proofId, publicIdentifier, institutionHash } = req.body;
    if (!publicIdentifier) {
      return res.status(400).json({ success: false, error: 'Missing public identifier' });
    }

    const verified = contractInstance.institutionApproval(
      publicIdentifier,
      institutionHash || '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
    );

    res.json({
      success: true,
      verified,
      message: verified ? 'Zero-knowledge proof verified on Midnight Smart Contract' : 'Proof verification failed or credential revoked',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/credential/register', (req: Request, res: Response) => {
  try {
    const { credentialId, institutionHash } = req.body;
    const now = BigInt(Math.floor(Date.now() / 1000));
    const ledger = contractInstance.registerCredential(credentialId, institutionHash, now);

    res.json({
      success: true,
      message: 'Credential registered on Midnight public ledger',
      ledger: {
        credentialCount: ledger.credentialCount.toString(),
        lastCredentialId: ledger.lastCredentialId,
        lastTimestamp: ledger.lastTimestamp.toString(),
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ProofScholar Express Proof Server running on http://localhost:${PORT}`);
});
