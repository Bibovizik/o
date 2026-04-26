export interface PublishGamePayload {
  name: string;
  releaseDate: string;
  description: string;
  basePriceUah: number;
  mostOneTimePlayers: number;
  image?: File;
  imageUrl?: string;
  marketPriceOverridesJson?: string;
  preserveExistingImage?: boolean;
  systemRequirementsJson?: string;
  genreIdsJson?: string;
}

export interface Game {
  gameId: number;
  name: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  publisherName: string;
  publisher: string;
  systemRequirements: string;
  genres: GameGenre[];
  mostOneTimePlayers: number;
  rating: number;
  tags: Tags[];
  basePriceUah: number;
  currentPrice: {
    amount: number;
    currencySymbol: string;
    currencyCode: string;
  };
  isOwnedByCurrentUser: boolean;
}

export interface GameReview {
  userId: number;
  userName: string;
  score: number;
  review: string | null;
  ratedAt: string;
}
export interface GameGenre {
  name: string;
  description: string;
}
export interface Tags {
  name: string;
}

export const PUBLISH_GAME_DESCRIPTION_MAX_LENGTH = 200;

export type PublishGameFormValues = {
  name: string;
  releaseDate: string;
  description: string;
  basePriceUah: string;
  mostOneTimePlayers: string;
  image: File | undefined;
  priceOverrides?: Record<string, number>;
  genreIds: number[];
};

export interface Dashboard {
  dateFrom: string;
  dateTo: string;
  publisherId: number;
  gameId: number | null;
  totals: {
    revenueUah: number;
    copiesSold: number;
    gameCount: number;
  };
  games: {
    gameId: number;
    gameName: string;
    revenueUah: number;
    copiesSold: number;
  }[];
  daily: {
    date: string;
    revenueUah: number;
    copiesSold: number;
  }[];
}

export interface Genre {
  genreId: number;
  name: string;
  description: string;
}

export interface GamePrice {
  marketCode: string;
  marketName: string;
  currencyCode: string;
  currencySymbol: string;
  amount: number;
  source: string;
  exchangeRateToUahSnapshot: number;
  exchangeDate: string | null;
}