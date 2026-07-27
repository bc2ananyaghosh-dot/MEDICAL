// Managed contract artifacts for ProofScholar Midnight Compact Contract

export interface ProofScholarLedger {
  credentialCount: bigint;
  verificationCount: bigint;
  lastCredentialId: string;
  lastVerificationStatus: boolean;
  lastInstitutionHash: string;
  lastTimestamp: bigint;
  isRevoked: boolean;
}

export class ProofScholarContract {
  private ledgerState: ProofScholarLedger;

  constructor() {
    this.ledgerState = {
      credentialCount: 0n,
      verificationCount: 0n,
      lastCredentialId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      lastVerificationStatus: false,
      lastInstitutionHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      lastTimestamp: 0n,
      isRevoked: false,
    };
  }

  public getLedger(): ProofScholarLedger {
    return { ...this.ledgerState };
  }

  public registerCredential(credentialId: string, institutionHash: string, timestamp: bigint): ProofScholarLedger {
    this.ledgerState.credentialCount += 1n;
    this.ledgerState.lastCredentialId = credentialId;
    this.ledgerState.lastInstitutionHash = institutionHash;
    this.ledgerState.lastTimestamp = timestamp;
    this.ledgerState.isRevoked = false;
    return this.getLedger();
  }

  public generateAndVerifyProof(
    credentialId: string,
    privateResearchHash: string,
    privateAuthorSecret: string,
    requiredInstitutionHash: string
  ): boolean {
    const isValidAuthor = Boolean(privateAuthorSecret && privateAuthorSecret !== '');
    const isValidResearch = Boolean(privateResearchHash && privateResearchHash !== '');
    const isValid = isValidAuthor && isValidResearch;

    this.ledgerState.verificationCount += 1n;
    this.ledgerState.lastVerificationStatus = isValid;
    return isValid;
  }

  public institutionApproval(credentialId: string, institutionHash: string): boolean {
    const approved = institutionHash === this.ledgerState.lastInstitutionHash && !this.ledgerState.isRevoked;
    this.ledgerState.lastVerificationStatus = approved;
    return approved;
  }

  public verifyReviewerCredential(reviewerSecret: string, minimumReviewCount: bigint): boolean {
    const isEligible = Boolean(reviewerSecret) && minimumReviewCount >= 1n;
    this.ledgerState.lastVerificationStatus = isEligible;
    return isEligible;
  }

  public verifyGrantEligibility(grantSecret: string, requiredCategory: string): boolean {
    const isEligible = Boolean(grantSecret) && Boolean(requiredCategory);
    this.ledgerState.lastVerificationStatus = isEligible;
    return isEligible;
  }

  public revokeCredential(credentialId: string): ProofScholarLedger {
    this.ledgerState.isRevoked = true;
    this.ledgerState.lastVerificationStatus = false;
    return this.getLedger();
  }
}

export const contractBytecode = "0x4d69646e6967687450726f6f665363686f6c6172";
