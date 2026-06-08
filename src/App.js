import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import WelcomePage from './pages/WelcomePage';
import PhonePage from './pages/PhonePage';
import SmsPage from './pages/SmsPage';
import NamePage from './pages/NamePage';
import SocialPage from './pages/SocialPage';
import PinSetPage from './pages/PinSetPage';
import PinLoginPage from './pages/PinLoginPage';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import BookingDonePage from './pages/BookingDonePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/register" element={<PhonePage />} />
        <Route path="/login" element={<PhonePage />} />
        <Route path="/sms" element={<SmsPage />} />
        <Route path="/name" element={<NamePage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/pin-set" element={<PinSetPage />} />
        <Route path="/pin-login" element={<PinLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/booking-done" element={<BookingDonePage />} />
      </Routes>
    </Router>
  );
}

export default App;