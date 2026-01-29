import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b-2 border-slate-900/10 sticky top-0 z-50" data-testid="main-navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 bg-amber-500 flex items-center justify-center font-bold text-slate-900 text-xl">
              SC
            </div>
            <span className="font-black text-xl tracking-tight uppercase text-slate-900">StreetCred</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-semibold transition-colors ${
                isActive('/') ? 'text-slate-900 border-b-2 border-amber-500' : 'text-slate-600 hover:text-slate-900'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`font-semibold transition-colors ${
                isActive('/discover') ? 'text-slate-900 border-b-2 border-amber-500' : 'text-slate-600 hover:text-slate-900'
              }`}
              data-testid="nav-discover"
            >
              Discover
            </Link>
            <Link
              to="/how-it-works"
              className={`font-semibold transition-colors ${
                isActive('/how-it-works') ? 'text-slate-900 border-b-2 border-amber-500' : 'text-slate-600 hover:text-slate-900'
              }`}
              data-testid="nav-how-it-works"
            >
              How It Works
            </Link>
            <Link to="/register" data-testid="nav-register-btn">
              <button className="btn-primary hard-shadow">Register Vendor</button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2" data-testid="mobile-menu">
            <Link
              to="/"
              className="block py-2 font-semibold text-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="block py-2 font-semibold text-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/how-it-works"
              className="block py-2 font-semibold text-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/register"
              className="block pt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button className="btn-primary w-full">Register Vendor</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;