import { describe, it, expect } from 'vitest';
import { createZeroKnowledgeProof, ProofScholarWitness } from '../src/witness';

describe('ProofScholar Zero-Knowledge Privacy Model Tests', () => {
  const confidentialWitness: ProofScholarWitness = {
    research: {
      title: 'TOP SECRET QUANTUM ALGORITHM FOR BREAKING RSA',
      abstractText: 'Confidential draft manuscript containing sensitive formula X = Y + Z...',
      coAuthors: ['Dr. Secret Author A', 'Prof. Secret Author B'],
      journalRef: 'IEEE-SECRET-2026',
      publicationDate: '2026-07-27',
    },
    author: {
      authorName: 'Professor Alice Cryptographer',
      orcidId: '0000-0001-9988-7766',
      authorSecret: 'super_secret_author_key_99182',
    },
    institution: {
      institutionName: 'Top Secret Quantum Lab',
      institutionDomain: 'quantumlab.org',
      institutionSecretKey: 'inst_secret_key_88192',
    },
  };

  it('should generate proof blob without exposing raw research manuscript text', () => {
    const proof = createZeroKnowledgeProof(confidentialWitness, 'authorship');

    const proofString = JSON.stringify(proof);

    // Verify confidential fields are NOT in output
    expect(proofString).not.toContain(confidentialWitness.research.title);
    expect(proofString).not.toContain(confidentialWitness.research.abstractText);
    expect(proofString).not.toContain(confidentialWitness.author.authorName);
    expect(proofString).not.toContain(confidentialWitness.author.authorSecret);

    // Verify metadata flag explicitly asserts zero leak
    expect(proof.hiddenDataSummary.confidentialDocumentsExposed).toBe(false);
    expect(proof.hiddenDataSummary.authorIdentityExposed).toBe(false);
    expect(proof.hiddenDataSummary.publicationDraftsExposed).toBe(false);
    expect(proof.hiddenDataSummary.institutionalDataExposed).toBe(false);
  });

  it('should produce deterministic proof boolean state and hash', () => {
    const proof = createZeroKnowledgeProof(confidentialWitness, 'authorship');
    expect(proof.verificationResult).toBe(true);
    expect(proof.proofHash).toMatch(/^0x[a-f0-9]{64}$/);
    expect(proof.publicIdentifier).toMatch(/^0x[a-f0-9]{64}$/);
  });
});
