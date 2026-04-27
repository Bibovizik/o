export type Role = 'Publisher' | 'User' | 'Admin';

export enum UserStatus {
  Active = 1,
  Banned = 2,
}

export interface User {
  userId: number;
  userName: string;
  email: string;
  countryCode: string;
  roles: Role[];
  accountStatusCode?: UserStatus;
}

export interface RegisterUser {
  userNickname: string;
  email: string;
  password: string;
  countryCode: string;
}

export interface RegisterPublisher extends RegisterUser {
  publisherName?: string;
  website?: string;
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