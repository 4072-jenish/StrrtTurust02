import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Shield } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ totalVendors: 0, totalSignals: 0, communityPillars: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/discover?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585574362839-63b0c1b09ad4?crop=entropy&cs=srgb&fm=jpg&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight mb-6" data-testid="hero-title">
              Know Who You're
              <br />
              <span className="text-amber-500">Buying From</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-slate-300">
              StreetCred helps you verify street vendor legitimacy through community trust signals.
              <br />No guessing. No hesitation. Just transparency.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12" data-testid="hero-search-form">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search vendors by name, type, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                    data-testid="search-input"
                  />
                </div>
                <button type="submit" className="btn-primary px-8" data-testid="search-button">
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" data-testid="discover-vendors-btn">
                <button className="btn-secondary hard-shadow px-8 py-4 text-base">Discover Vendors</button>
              </Link>
              <Link to="/register" data-testid="register-vendor-btn">
                <button className="btn-primary px-8 py-4 text-base">Register as Vendor</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white border-b-2 border-slate-900/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="stat-vendors">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-slate-900" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stats.totalVendors}</div>
              <div className="text-slate-600 font-semibold uppercase tracking-wide text-sm">Registered Vendors</div>
            </div>
            <div className="text-center" data-testid="stat-signals">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stats.totalSignals}</div>
              <div className="text-slate-600 font-semibold uppercase tracking-wide text-sm">Trust Signals</div>
            </div>
            <div className="text-center" data-testid="stat-pillars">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stats.communityPillars}</div>
              <div className="text-slate-600 font-semibold uppercase tracking-wide text-sm">Community Pillars</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Preview */}
      <div className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-slate-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-search">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-4 font-black text-2xl text-slate-900">
                1
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Search</h3>
              <p className="text-slate-600 leading-relaxed">
                Find vendors by name, location, or business type. Browse the community directory.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-verify">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4 font-black text-2xl text-white">
                2
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Verify</h3>
              <p className="text-slate-600 leading-relaxed">
                Check their trust level, community signals, and registration details before buying.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-signal">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 font-black text-2xl text-white">
                3
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Signal</h3>
              <p className="text-slate-600 leading-relaxed">
                Add your trust signal after a positive interaction to help others make informed decisions.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/how-it-works" data-testid="learn-more-btn">
              <button className="btn-secondary hard-shadow px-8 py-3">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-amber-500 flex items-center justify-center font-bold text-slate-900 text-xl">
              SC
            </div>
            <span className="font-black text-2xl tracking-tight uppercase">StreetCred</span>
          </div>
          <p className="text-slate-400 mb-4">Building trust in the street economy, one signal at a time.</p>
          <p className="text-slate-500 text-sm">© 2024 StreetCred. Community-driven legitimacy platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;