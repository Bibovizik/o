import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_ORIGIN, api } from "../api/axios";
import '../App.css';

interface Game {
  gameId: number;
  name: string;
  publisherName: string;
  rating: number;
  imageUrl: string;
}

const Store = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const genreFilter = searchParams.get('genre');

  useEffect(() => {
    const loadGames = async () => {
      try {
        if (genreFilter) {
          const { data } = await api.get<Game[]>(`/games/genres/${genreFilter}`);
          setGames(data);
        } else {
          // Otherwise, load all games normally
          const { data } = await api.get<Game[]>('/Game');
          setGames(data);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    void loadGames();
  }, [genreFilter]);


  const handleTestApi = async () => {
    try {
      const { data } = await api.get<string>('/user/test');
      console.log('Test endpoint response:', data);
    } catch (error) {
      console.error('Error fetching test:', error);
    }
  };
  const handleAdminTest = async () => {
    try {
      const { data } = await api.get<string>('/user/testAdmin');
      console.log('Admin test endpoint response:', data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        navigate('/login');
        return;
      }

      console.error('Error fetching admin test:', error);
    }
  };
  const searchByGenre = async () => {
    try {
      const { data } = await api.get<Game[]>(`games/genres/${searchTerm}`);
      setGames(data);
    } catch (error) {
      console.error('Error searching by genre:', error);
    }
  }
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-primary">
      <div className="container w-100 bg-dark " style={{ maxWidth: '1000px' }}>
        <h2 className="mb-4 text-white">Featured & Recommended</h2>

        <div>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Search games..."
            style={{ backgroundColor: '#2a475e', border: 'none', color: '#c7d5e0' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        {/* Optional: Show the user what genre they are currently filtering by */}
        {genreFilter && (
          <div className="mb-4 d-flex align-items-center">
            <span className="text-white fs-5 me-3">
              Genre: <span className="badge bg-info">{genreFilter}</span>
            </span>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setSearchParams({})} // Clears the URL parameters
            >
              Clear Filter
            </button>
          </div>
        )}

        <button className="btn btn-secondary mb-4" onClick={handleTestApi}>Test API</button>
        <button className="btn btn-secondary mb-4 ms-2" onClick={handleAdminTest}>Test Admin API</button>

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredGames.map((game) => (
            <Link to={`/game/${game.gameId}`} className="text-decoration-none">
              <div key={game.gameId} className="col">
                <div className="p-3 rounded h-100 d-flex flex-column" style={{ backgroundColor: '#2a475e' }}>
                  <img
                    src={`${API_ORIGIN}${game.imageUrl}`}
                    alt={game.name}
                    className="mb-3"
                    style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <h3 className="text-white fs-5">{game.name}</h3>
                </div>
              </div>
            </Link>
          ))
          }
        </div>

        {filteredGames.length === 0 && games.length > 0 && (
          <p className="text-white">No games match your search.</p>
        )}

        {games.length === 0 && <p>Loading games or database is empty...</p>}
      </div>
    </div>
  );
};

export default Store;
