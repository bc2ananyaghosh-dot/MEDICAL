import { describe, it, expect } from 'vitest';
import { getContractConfig } from '../src/services/midnightService';

describe('ProofScholar Configuration & Environment Tests', () => {
  it('should resolve default network configuration correctly', () => {
    const config = getContractConfig();
    expect(config.network).toBeDefined();
    expect(config.contractAddress).toMatch(/^0x[a-fA-F0-9]+/);
    expect(config.proofServerUrl).toMatch(/^http/);
  });
});
