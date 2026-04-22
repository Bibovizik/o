import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Login from './components/Login';
import GameDetails from './pages/GameDetails';
import Register from './components/Register';
import Store from './pages/Store';
import ProtectedRoute from './components/ProtectedRoute';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily:
      "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
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

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:id"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
