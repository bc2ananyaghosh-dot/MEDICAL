export interface ResearchMetadata {
  title: string;
  abstractText: string;
  coAuthors: string[];
  journalRef: string;
  publicationDate: string;
}

export interface AuthorInformation {
  authorName: string;
  orcidId: string;
  authorSecret: string;
}

export interface InstitutionRecords {
  institutionName: string;
  institutionDomain: string;
  institutionSecretKey: string;
}

export interface ReviewerIdentity {
  reviewerId: string;
  reviewerSecret: string;
  peerReviewCount: number;
}

export interface GrantDetails {
  grantId: string;
  grantSecret: string;
  requestedCategory: string;
  fundingAmountUSD: number;
}

export interface ProofScholarWitness {
  research: ResearchMetadata;
  author: AuthorInformation;
  institution: InstitutionRecords;
  reviewer?: ReviewerIdentity;
  grant?: GrantDetails;
}

export interface PublicLedgerRecord {
  credentialId: string;
  verificationStatus: boolean;
  institutionHash: string;
  timestamp: number;
  isRevoked: boolean;
}

export interface ZeroKnowledgeProofBlob {
  proofId: string;
  publicIdentifier: string;
  institutionHash: string;
  verificationResult: boolean;
  disclosedData: {
    proofValidity: boolean;
    credentialStatus: 'Active' | 'Revoked' | 'Pending';
    timestamp: number;
  };
  hiddenDataSummary: {
    confidentialDocumentsExposed: false;
    publicationDraftsExposed: false;
    authorIdentityExposed: false;
    institutionalDataExposed: false;
  };
  proofHash: string;
}

// Pure browser & node compatible hash function
export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return hex.repeat(8).slice(0, 64);
}

function getRandomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCredentialId(witness: ProofScholarWitness): string {
  const payload = `${witness.author.orcidId}:${witness.research.title}:${witness.institution.institutionDomain}`;
  return '0x' + hashString(payload);
}

export function generateInstitutionHash(domain: string): string {
  return '0x' + hashString(domain.toLowerCase());
}

export function createZeroKnowledgeProof(
  witness: ProofScholarWitness,
  type: 'authorship' | 'institution' | 'reviewer' | 'grant' = 'authorship'
): ZeroKnowledgeProofBlob {
  const credentialId = generateCredentialId(witness);
  const instHash = generateInstitutionHash(witness.institution.institutionDomain);
  const proofId = 'zkp_' + getRandomHex(12);
  const now = Math.floor(Date.now() / 1000);

  let result = true;
  if (type === 'reviewer' && witness.reviewer) {
    result = witness.reviewer.peerReviewCount >= 1 && Boolean(witness.reviewer.reviewerSecret);
  } else if (type === 'grant' && witness.grant) {
    result = Boolean(witness.grant.grantSecret) && witness.grant.fundingAmountUSD > 0;
  }

  const proofHash = hashString(`${proofId}:${credentialId}:${result}:${now}`);

  return {
    proofId,
    publicIdentifier: credentialId,
    institutionHash: instHash,
    verificationResult: result,
    disclosedData: {
      proofValidity: result,
      credentialStatus: 'Active',
      timestamp: now,
    },
    hiddenDataSummary: {
      confidentialDocumentsExposed: false,
      publicationDraftsExposed: false,
      authorIdentityExposed: false,
      institutionalDataExposed: false,
    },
    proofHash: '0x' + proofHash,
  };
}
