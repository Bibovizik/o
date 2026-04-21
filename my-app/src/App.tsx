import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './components/Store';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import AxiosSetup from './components/AxiosSetup';
import GameDetails from './components/GameDetails';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Temp from './components/Testing';
import Register from './components/Register';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[6],
          transition: theme.transitions.create('box-shadow', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeOut,
          }),
          '&:hover': {
            boxShadow: theme.shadows[12],
          },
        }),
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <AxiosSetup>
          <NavBar />
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/testing" element={<Temp />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AxiosSetup>
      </Router>
    </ThemeProvider>
  );
}

export default App;
