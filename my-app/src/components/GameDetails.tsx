import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, API_ORIGIN } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ReviewForm from "./ReviewForm";

type Genre = {
  name: string;
};

type GameReview = {
  userId: number;
  score: number;
  review?: string | null;
  ratedAt: string;
};

type GamePrice = {
  amount: number;
  currencyCode: string;
  currencySymbol: string;
  source: string;
};

type PurchaseReceipt = {
  gameId: number;
  gameName: string;
  purchasedAt: string;
  chargedPrice: GamePrice;
  remainingBalance: number;
};

type GameDetailsDto = {
  gameId: number;
  name: string;
  releaseDate?: string | null;
  rating?: number | null;
  publisherId: number;
  systemRequirements?: string | null;
  mostOneTimePlayers: number;
  publisherName?: string | null;
  description: string;
  genres: Genre[];
  imageUrl?: string | null;
  gameReviews: GameReview[];
  basePriceUah: number;
  currentPrice?: GamePrice | null;
  isOwnedByCurrentUser: boolean;
};

const fallbackUahPrice = (amount: number) => `\u20B4${amount.toFixed(2)}`;

const formatMoney = (price?: GamePrice | null, fallbackAmount?: number) => {
  if (!price) {
    return fallbackAmount === undefined ? "" : fallbackUahPrice(fallbackAmount);
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: price.currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price.amount);
  } catch {
    return `${price.currencySymbol}${price.amount.toFixed(2)}`;
  }
};

const GameDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<GameDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [purchaseError, setPurchaseError] = useState("");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const loadGame = async () => {
      setIsLoading(true);
      setPurchaseMessage("");
      setPurchaseError("");

      try {
        const response = await api.get<GameDetailsDto>(`/games/${id}`);
        setGame({ ...response.data, gameId: Number(id) });
      } catch (error) {
        console.error("Error fetching game details:", error);
        setGame(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadGame();
  }, [id]);

  const handlePurchase = async () => {
    if (!id) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    setIsBuying(true);
    setPurchaseMessage("");
    setPurchaseError("");

    try {
      const response = await api.post<PurchaseReceipt>(`/games/${id}/purchase`);
      const receipt = response.data;

      setGame((current) =>
        current
          ? {
            ...current,
            isOwnedByCurrentUser: true,
            currentPrice: receipt.chargedPrice,
          }
          : current,
      );

      setPurchaseMessage(
        `Purchased for ${formatMoney(receipt.chargedPrice)}. Remaining balance: ${receipt.remainingBalance.toFixed(2)} ${receipt.chargedPrice.currencyCode}.`,
      );
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
          : "Purchase failed. Check your wallet balance and try again.";

      setPurchaseError(message);
    } finally {
      setIsBuying(false);
    }
  };

  const displayPrice = formatMoney(game?.currentPrice, game?.basePriceUah);
  const isOwned = game?.isOwnedByCurrentUser ?? false;
  const isAuthenticated = Boolean(user);

  return (
    <div className="fs-3">
      {isLoading ? (
        <div className="container text-center mt-5">
          <h3 className="text-muted">Loading game...</h3>
        </div>
      ) : game ? (
        <div className="bg-primary py-4 min-vh-100">
          <div
            className="container bg-dark text-white border border-secondary rounded shadow-lg px-4 py-4"
            style={{ maxWidth: "1000px" }}
          >
            <div className="d-flex flex-column flex-md-row align-items-md-start gap-4">
              <div className="flex-shrink-0" style={{ width: "100%", maxWidth: "650px" }}>
                <h2 className="mb-3">{game.name}</h2>
                <img
                  src={`${API_ORIGIN}${game.imageUrl}`}
                  alt={game.name}
                  style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                  className="rounded shadow"
                />
              </div>

              <div className="d-flex flex-column flex-grow-1 mt-md-5 text-md-end">
                <p className="text-info fs-5 mb-1 fw-bold">Publisher: {game.publisherName}</p>
                <p className="text-secondary fs-6 mb-0">
                  Release Date: {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : "TBA"}
                </p>

                <div>
                  <span className="text-secondary fs-6 me-2">Genres:</span>
                  {game.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary text-light me-1 fs-6 text-wrap"
                      title={`Search for more ${genre.name} games`}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/?genre=${encodeURIComponent(genre.name)}`)}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="mt-3">
                  Price: <span className="text-warning fw-bold fs-4">{displayPrice}</span>
                </div>

                <div className="mt-2">
                  <small className="text-secondary">
                    Source: {game.currentPrice?.source === "RegionalPrice" ? "regional price" : "base UAH fallback"}
                  </small>
                </div>

                <div className="mt-3">
                  <span className="text-secondary fs-6 me-2">Rating:</span>
                  <span className="text-warning fw-bold fs-5">
                    {game.rating ? `${game.rating.toFixed(1)} / 10` : "No ratings yet"}
                  </span>
                </div>

                <div className="mt-4 d-flex flex-column align-items-md-end gap-2">
                  <button
                    type="button"
                    className={`btn ${isOwned ? "btn-outline-success" : "btn-info"} px-4`}
                    disabled={isBuying || isOwned}
                    onClick={handlePurchase}
                  >
                    {isOwned
                      ? "Already in library"
                      : isBuying
                        ? "Processing purchase..."
                        : isAuthenticated
                          ? `Buy for ${displayPrice}`
                          : "Sign in to buy"}
                  </button>

                  {purchaseMessage && <div className="text-success fs-6">{purchaseMessage}</div>}
                  {purchaseError && <div className="text-danger fs-6">{purchaseError}</div>}
                </div>
              </div>
            </div>

            <div
              className="mt-4 p-3 rounded"
              style={{ borderLeft: "3px solid #1a9fff", background: "rgba(255,255,255,0.05)" }}
            >
              <h5
                className="text-info mb-2"
                style={{ letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.8rem" }}
              >
                About This Game
              </h5>
              <p
                className="mb-0 fs-6 text-light"
                style={{
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {game.description}
              </p>
            </div>

            <hr className="border-secondary my-4" />

            <div className="mt-4">
              <h3 className="mb-3">Community Reviews</h3>

              <div className="mb-4">
                <ReviewForm gameId={game.gameId} />
              </div>

              <div className="d-flex flex-column gap-3">
                {game.gameReviews && game.gameReviews.length > 0 ? (
                  game.gameReviews.map((review, index) => (
                    <div key={index} className="review-card bg-secondary bg-opacity-10 border border-secondary rounded p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="m-0 text-warning">Score {review.score} / 10</h5>
                        <small className="text-muted">{new Date(review.ratedAt).toLocaleDateString()}</small>
                      </div>

                      <p className="m-0 fs-6">
                        {review.review ? (
                          review.review
                        ) : (
                          <span className="text-muted fst-italic">No written review provided.</span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-3 border border-secondary rounded border-dashed">
                    No reviews yet. Be the first to review {game.name}!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center mt-5">
          <h3 className="text-muted">Game not found</h3>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
