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
  };
  isOwnedByCurrentUser: boolean;
}

export interface GameReview {
  userId: number;
  score: number;
  review: string | null; // Nullable to match backend string?
  ratedAt: string; // JSON parses dates as strings
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
};
