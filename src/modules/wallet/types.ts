import { ethers } from 'ethers';

export type WalletState = {
  address: string | null;
  symbol: string | null;
  balance: string | null;
  isConnecting: boolean;
  isSending: boolean;
  error: string | null;
};

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider;
};
