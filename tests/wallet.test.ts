import { describe, it, expect, beforeEach } from 'vitest';
import { LaceWalletAdapter } from '../src/services/laceWallet';

describe('Lace Wallet Adapter Tests', () => {
  let adapter: LaceWalletAdapter;

  beforeEach(() => {
    adapter = new LaceWalletAdapter();
  });

  it('should initialize in disconnected state', () => {
    const state = adapter.getState();
    expect(state.isConnected).toBe(false);
    expect(state.address).toBeNull();
    expect(state.isConnecting).toBe(false);
  });

  it('should connect wallet and set address & balance', async () => {
    const connected = await adapter.connect();
    expect(connected).toBe(true);

    const state = adapter.getState();
    expect(state.isConnected).toBe(true);
    expect(state.address).toBe('mn_test1q8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5');
    expect(state.balance).toBe('500.00 tDUST');
  });

  it('should disconnect wallet cleanly', async () => {
    await adapter.connect();
    expect(adapter.getState().isConnected).toBe(true);

    adapter.disconnect();
    const state = adapter.getState();
    expect(state.isConnected).toBe(false);
    expect(state.address).toBeNull();
    expect(state.balance).toBe('0.00 tDUST');
  });
});
