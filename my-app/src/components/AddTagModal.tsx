import { useState } from 'react';
import { api } from '../api/axios';

interface Props {
  gameId: number;
  onClose: () => void;
  onTagAdded: (tag: { name: string }) => void;
}

const AddTagModal = ({ gameId, onClose, onTagAdded }: Props) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tag name is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post(`/games/${gameId}/tags`, { name: name.trim() });
      onTagAdded({ name: name.trim() });
      onClose();
    } catch (err) {
      console.error('Failed to add tag:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-dark text-white border border-secondary rounded shadow-lg p-4"
        style={{ width: '100%', maxWidth: '400px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0">Add tag</h5>
          <button
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label text-secondary small">Tag name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="e.g. Open world"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              maxLength={50}
            />
          </div>

          {error && <p className="text-danger small mb-3">{error}</p>}

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-outline-info"
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Adding…
                </>
              ) : (
                'Add tag'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagModal;
