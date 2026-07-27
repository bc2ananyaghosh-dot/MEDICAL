export interface MedicalRecordMetadata {
  recordTitle?: string;
  diagnosisSummary?: string;
  treatingPhysicians?: string[];
  clinicRef?: string;
  recordDate?: string;

  // Compatibility aliases
  title?: string;
  abstractText?: string;
  coAuthors?: string[];
  journalRef?: string;
  publicationDate?: string;
}

export interface PatientInformation {
  patientName?: string;
  medicalId?: string;
  patientSecretKey?: string;

  // Compatibility aliases
  authorName?: string;
  orcidId?: string;
  authorSecret?: string;
}

export interface HealthcareProviderRecords {
  providerName?: string;
  providerDomain?: string;
  providerSecretKey?: string;

  // Compatibility aliases
  institutionName?: string;
  institutionDomain?: string;
  institutionSecretKey?: string;
}

export interface DoctorCertification {
  doctorLicenseId?: string;
  doctorSecret?: string;
  verifiedConsultationsCount?: number;
  reviewerId?: string;
  reviewerSecret?: string;
  peerReviewCount?: number;
}

export interface InsuranceClaimDetails {
  policyId?: string;
  claimSecret?: string;
  coverageCategory?: string;
  claimAmountUSD?: number;
  grantId?: string;
  grantSecret?: string;
  requestedCategory?: string;
  fundingAmountUSD?: number;
}

export interface MedVaultWitness {
  record?: MedicalRecordMetadata;
  research?: MedicalRecordMetadata;
  patient?: PatientInformation;
  author?: PatientInformation;
  provider?: HealthcareProviderRecords;
  institution?: HealthcareProviderRecords;
  doctor?: DoctorCertification;
  reviewer?: DoctorCertification;
  insurance?: InsuranceClaimDetails;
  grant?: InsuranceClaimDetails;
}

export type ProofScholarWitness = MedVaultWitness;

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
    confidentialDocumentsExposed: boolean;
    authorIdentityExposed: boolean;
    publicationDraftsExposed: boolean;
    institutionalDataExposed: boolean;
  };
  proofHash: string;
}

export function generateCredentialId(witness: MedVaultWitness): string {
  const patientData = witness.patient || witness.author || { medicalId: 'MED-001', authorName: 'Ananya Ghosh' };
  const recordData = witness.record || witness.research || { recordTitle: 'General Health Audit' };
  const providerData = witness.provider || witness.institution || { providerDomain: 'medvault.health' };
  const payload = `${patientData.medicalId || patientData.orcidId || 'ID'}:${recordData.recordTitle || recordData.title || 'Record'}:${providerData.providerDomain || providerData.institutionDomain || 'Domain'}`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash << 5) - hash + payload.charCodeAt(i);
    hash |= 0;
  }
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hexHash.repeat(8)}`;
}

export function createZeroKnowledgeProof(
  witness: MedVaultWitness,
  type: 'authorship' | 'institution' | 'reviewer' | 'grant' | 'record' | 'provider' | 'doctor' | 'insurance' = 'record'
): ZeroKnowledgeProofBlob {
  const credId = generateCredentialId(witness);
  const providerData = witness.provider || witness.institution || { providerDomain: 'medvault.health' };
  const domainStr = providerData.providerDomain || providerData.institutionDomain || 'medvault.health';
  const instHash = `0x${domainStr.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0).toString(16).padStart(8, '0').repeat(8)}`;

  return {
    proofId: `proof_${Math.random().toString(36).substring(2, 10)}`,
    publicIdentifier: credId,
    institutionHash: instHash,
    verificationResult: true,
    disclosedData: {
      proofValidity: true,
      credentialStatus: 'Active',
      timestamp: Math.floor(Date.now() / 1000),
    },
    hiddenDataSummary: {
      confidentialDocumentsExposed: false,
      authorIdentityExposed: false,
      publicationDraftsExposed: false,
      institutionalDataExposed: false,
    },
    proofHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
  };
}
