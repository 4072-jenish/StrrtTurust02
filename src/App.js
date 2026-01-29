import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VendorDiscovery from './pages/VendorDiscovery';
import VendorProfile from './pages/VendorProfile';
import VendorRegistration from './pages/VendorRegistration';
import HowItWorks from './pages/HowItWorks';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<VendorDiscovery />} />
          <Route path="/vendor/:id" element={<VendorProfile />} />
          <Route path="/register" element={<VendorRegistration />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;