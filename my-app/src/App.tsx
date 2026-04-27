import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Login from './components/Login';
import GameDetails from './pages/GameDetails/GameDetails';
import Register from './components/Register';
import Store from './pages/Store/Store';
import ProtectedRoute from './components/ProtectedRoute';
import Library from './pages/Library/Library';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import RootNotification from './components/RootNotification';

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
      <RootNotification />
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Store />
            }
          />
          <Route
            path="/game/:id/:isLibrary?"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
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
