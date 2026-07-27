import { describe, it, expect, beforeEach } from 'vitest';
import { ProofScholarContract } from '../contracts/managed/proof_scholar/index';

describe('ProofScholar Compact Smart Contract Tests', () => {
  let contract: ProofScholarContract;

  beforeEach(() => {
    contract = new ProofScholarContract();
  });

  it('should initialize ledger state correctly', () => {
    const ledger = contract.getLedger();
    expect(ledger.credentialCount).toBe(0n);
    expect(ledger.verificationCount).toBe(0n);
    expect(ledger.isRevoked).toBe(false);
  });

  it('should register research credential on public ledger', () => {
    const credId = '0x8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a';
    const instHash = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b';
    const timestamp = BigInt(Math.floor(Date.now() / 1000));

    const ledger = contract.registerCredential(credId, instHash, timestamp);
    expect(ledger.credentialCount).toBe(1n);
    expect(ledger.lastCredentialId).toBe(credId);
    expect(ledger.lastInstitutionHash).toBe(instHash);
    expect(ledger.lastTimestamp).toBe(timestamp);
  });

  it('should generate and verify zero-knowledge contribution proof', () => {
    const credId = '0x8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a';
    const resHash = '0x99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff';
    const authorSecret = 'author_secret_key_123';
    const instHash = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b';

    const verified = contract.generateAndVerifyProof(credId, resHash, authorSecret, instHash);
    expect(verified).toBe(true);

    const ledger = contract.getLedger();
    expect(ledger.verificationCount).toBe(1n);
    expect(ledger.lastVerificationStatus).toBe(true);
  });

  it('should verify reviewer credentials threshold', () => {
    const secret = 'reviewer_secret_token';
    const count = 5n;

    const isEligible = contract.verifyReviewerCredential(secret, count);
    expect(isEligible).toBe(true);
  });

  it('should verify grant eligibility privately', () => {
    const secret = 'grant_secret_key';
    const category = 'Computer Science & ZK Cryptography';

    const isEligible = contract.verifyGrantEligibility(secret, category);
    expect(isEligible).toBe(true);
  });

  it('should revoke credential and set status to false', () => {
    const credId = '0x8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a';
    const instHash = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b';
    contract.registerCredential(credId, instHash, 1000n);

    const ledgerBefore = contract.getLedger();
    expect(ledgerBefore.isRevoked).toBe(false);

    const ledgerAfter = contract.revokeCredential(credId);
    expect(ledgerAfter.isRevoked).toBe(true);
    expect(ledgerAfter.lastVerificationStatus).toBe(false);
  });
});
