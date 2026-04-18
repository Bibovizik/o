import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed
import { api } from "../api/axios";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        logout();
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        }
        navigate("/login");
    }
  
  return (
    <button className="btn btn-primary mt-3" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;