import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Global, css } from '@emotion/react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import PillDispenser from './pages/PillDispenser';
import Profile from './pages/Profile';
import HealthRecords from './pages/HealthRecords';
import EmergencyContacts from './pages/EmergencyContacts';
import Telemedicine from './pages/Telemedicine';
import Nutrition from './pages/Nutrition';

const theme = createTheme({
  palette: {
    primary: {
      main: '#694F8E',
    },
    secondary: {
      main: '#E3A5C7',
    },
    background: {
      default: '#FFDFD6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const globalStyles = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .slideIn {
    animation: slideIn 0.5s ease-out;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/app" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="community" element={<Community />} />
              <Route path="pill-dispenser" element={<PillDispenser />} />
              <Route path="profile" element={<Profile />} />
              <Route path="health-records" element={<HealthRecords />} />
              <Route path="emergency-contacts" element={<EmergencyContacts />} />
              <Route path="telemedicine" element={<Telemedicine />} />
              <Route path="nutrition" element={<Nutrition />} />
              <Route index element={<Navigate to="/app/dashboard" replace />} />
            </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
