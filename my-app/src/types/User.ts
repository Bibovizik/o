export type Role = 'Publisher' | 'User' | 'Admin';

export interface User {
  id: string;
  userName: string;
  email: string;
  countryCode: string;
  roles: Role[];
}

export interface RegisterUser {
  userNickname: string;
  email: string;
  password: string;
  countryCode: string;
}

export interface RegisterPublisher extends RegisterUser {
  publisherName: string;
  website: string;
}

export interface WalletBalance {
  balances: {
    currencyCode: string;
    availableAmount: number;
  }[],
  entries: {
    walletEntryId: number;
    amount: number;
    balanceAfter: number;
    createdAt: string;
    currencyCode: string;
    description: string;
  }[],
}

export interface TopUpWallet {
  amount: number;
  description: string;
}