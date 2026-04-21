import { useState } from "react";
import { api } from "../api/axios";

// Define the props so the component knows it needs a Game ID
interface ReviewFormProps {
    gameId: number;
}

const ReviewForm = ({ gameId }: ReviewFormProps) => {
    const [review, setReview] = useState("");
    const [score, setScore] = useState(10);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitReview = async () => {
        setIsSubmitting(true);
        try {
            await api.post(`games/createReview/${gameId}`, { score, review });
            alert("Review submitted!");
            setReview("");
            setScore(10);
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="review-card bg-secondary bg-opacity-10 border border-secondary rounded p-3">
            <h2>Submit a Review</h2>
            <form action={submitReview}>

                <div className="mb-3">
                    <label htmlFor="score" className="form-label">Score (1-10)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="score"
                        min="1"
                        max="10"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="reviewText" className="form-label">Your Review</label>
                    <textarea
                        className="form-control"
                        id="reviewText"
                        rows={3}
                        placeholder="Write your review here"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;