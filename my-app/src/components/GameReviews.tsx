import {
  Stack,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Tooltip,
  CardHeader,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import ReviewTag from './ReviewTag';
import SelectableReviewTag from './SelectableReviewTag';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAddReviewMutation, useGetReviewsQuery } from '../store/api';
import { useParams } from 'react-router-dom';
import { useGetGameQuery } from '../store/api';

const GameReviews = () => {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  const { data: game } = useGetGameQuery({
    id: Number(id),
  });

  const { data: reviews, isFetching: isFetchingReviews } = useGetReviewsQuery({
    id: Number(id),
  });

  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();

  const handleSubmit = () => {
    addReview({ id: Number(id), score: selectedScore, review }).then(() => {
      setShowAddReviewForm(false);
      setReview('');
      setSelectedScore(null);
    });
  };

  if (isFetchingReviews)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Reviews
        </Typography>
        {!showAddReviewForm && (
          <Tooltip
            title={
              !game?.isOwnedByCurrentUser
                ? 'You must own the game to add a review'
                : 'Add a review'
            }
          >
            <span>
              <Button
                disabled={!game?.isOwnedByCurrentUser}
                variant="outlined"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => setShowAddReviewForm(true)}
              >
                Add a review
              </Button>
            </span>
          </Tooltip>
        )}
      </Stack>
      <Stack direction="column" spacing={2}>
        {showAddReviewForm && (
          <Card>
            <CardHeader
              sx={{ p: 2 }}
              action={
                <IconButton onClick={() => setShowAddReviewForm(false)}>
                  <CancelIcon />
                </IconButton>
              }
            />
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Add a review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: 'end', p: 2, pt: 0, gap: 2 }}>
              <SelectableReviewTag
                value={selectedScore}
                onChange={setSelectedScore}
              />
              <Tooltip
                title={
                  selectedScore === null
                    ? 'Please select a score'
                    : 'Submit your review'
                }
              >
                <span>
                  <Button
                    size="large"
                    disabled={selectedScore === null}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<SendIcon />}
                    loading={isAddingReview}
                  >
                    Submit
                  </Button>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        )}
        {!reviews?.length && (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No reviews yet
          </Typography>
        )}
        {reviews?.map((review) => (
          <Card
            key={`${review.ratedAt}-${review.userId}`}
            sx={{ minHeight: '150px' }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <ReviewTag rating={review.score} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {review.review}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default GameReviews;
