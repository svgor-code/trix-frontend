import { Signer, ethers, BrowserProvider, Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider | null;
  }
}

interface IAuthProvider {
  isConnected: boolean;
  isAuthenticated: boolean;
  signer: Signer | null;
  provider: BrowserProvider | null;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export const AuthProvider: IAuthProvider = {
  isAuthenticated: false,
  isConnected: false,
  signer: null,
  provider: null,

  async connect() {
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
      this.provider = ethers.getDefaultProvider("") as BrowserProvider;
    } else {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.isConnected = true;
    }
  },

  async disconnect() {
    if (!this.isConnected || !this.provider || !this.signer) {
      return;
    }

    await this.provider.destroy();

    this.isConnected = false;
  },
};
