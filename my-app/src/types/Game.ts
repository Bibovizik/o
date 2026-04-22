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
