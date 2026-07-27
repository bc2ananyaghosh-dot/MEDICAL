export interface LaceWalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  balance: string;
  isConnecting: boolean;
  error: string | null;
}

export class LaceWalletAdapter {
  private state: LaceWalletState = {
    isConnected: false,
    address: null,
    network: import.meta.env.VITE_NETWORK || 'localnet',
    balance: '0.00 tDUST',
    isConnecting: false,
    error: null,
  };

  private listeners: Array<(state: LaceWalletState) => void> = [];

  public getState(): LaceWalletState {
    return { ...this.state };
  }

  public subscribe(callback: (state: LaceWalletState) => void): () => void {
    this.listeners.push(callback);
    callback(this.state);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  public async connect(): Promise<boolean> {
    this.state.isConnecting = true;
    this.state.error = null;
    this.notify();

    try {
      // Check if Lace Wallet is injected in browser window
      const laceObj = (window as any).lace || (window as any).midnight?.lace;
      if (laceObj) {
        const api = await laceObj.enable();
        const address = await api.getChangeAddress();
        this.state.isConnected = true;
        this.state.address = address || 'mn_test1q8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5';
        this.state.balance = '1,250.00 tDUST';
        this.state.isConnecting = false;
        this.notify();
        return true;
      } else {
        // Fallback for demo/development when Lace extension is not installed
        console.warn('Lace extension not found. Enabling mock wallet mode.');
        this.state.isConnected = true;
        this.state.address = 'mn_test1q8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5';
        this.state.balance = '500.00 tDUST';
        this.state.isConnecting = false;
        this.notify();
        return true;
      }
    } catch (err: any) {
      this.state.isConnecting = false;
      this.state.error = err.message || 'Failed to connect Lace Wallet';
      this.notify();
      return false;
    }
  }

  public disconnect() {
    this.state.isConnected = false;
    this.state.address = null;
    this.state.balance = '0.00 tDUST';
    this.notify();
  }
}

export const laceWallet = new LaceWalletAdapter();
