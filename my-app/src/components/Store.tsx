import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ORIGIN, api } from "../api/axios";

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

  useEffect(() => {
    const loadGames = async () => {
      try {
        const { data } = await api.get<Game[]>('/Game');
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    void loadGames();
  }, []);

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

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="d-flex flex-column align-items-center min-vh-100 py-4" 
      style={{ backgroundColor: '#171a21', color: '#c7d5e0' }}
    >
      <div className="container w-100" style={{ maxWidth: '1000px' }}>
        <h2 className="mb-4 text-white">Featured & Recommended</h2>
        
        <input 
          type="text" 
          className="form-control mb-4" 
          placeholder="Search games..." 
          style={{ backgroundColor: '#2a475e', border: 'none', color: '#c7d5e0' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div 
          className="p-4 rounded shadow-sm mb-4" 
          style={{ backgroundColor: '#1b2838' }}
        >
          <p>
            This content is perfectly centered. No matter how wide the user's monitor is, 
            this box will never stretch wider than 1000px, keeping your UI looking tight and professional.
          </p>
        </div>
        <button className="btn btn-secondary mb-4" onClick={handleTestApi}>Test API</button>
        <button className="btn btn-secondary mb-4 ms-2" onClick={handleAdminTest}>Test Admin API</button>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredGames.map((game) => (
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
          ))}
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
