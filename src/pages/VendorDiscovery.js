import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VendorCard from '../components/VendorCard';
import { Search, Filter } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VendorDiscovery = () => {
  const [searchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/vendors`);
      setVendors(response.data.vendors || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      fetchVendors();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API}/vendors/search?q=${encodeURIComponent(query)}`);
      setVendors(response.data.vendors || []);
    } catch (error) {
      console.error('Error searching vendors:', error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByType = async (type) => {
    setFilterType(type);
    if (type === 'all') {
      fetchVendors();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API}/vendors/type/${type}`);
      setVendors(response.data.vendors || []);
    } catch (error) {
      console.error('Error filtering vendors:', error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const businessTypes = ['all', 'Food Stall', 'Mobile Repair', 'Clothing', 'Accessories', 'Beverages', 'Services'];

  return (
    <div className="min-h-screen py-8" data-testid="vendor-discovery-page">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-slate-900" data-testid="page-title">
            Discover Vendors
          </h1>
          <p className="text-lg text-slate-600">Browse and search registered street vendors in your community.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 mb-8 hard-shadow">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, type, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                data-testid="discovery-search-input"
              />
            </div>
            <button onClick={() => handleSearch()} className="btn-primary px-8" data-testid="search-btn">
              Search
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-slate-600" />
            <span className="text-sm font-semibold text-slate-600 mr-2">Filter by type:</span>
            {businessTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterByType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterType === type
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                data-testid={`filter-${type.toLowerCase().replace(' ', '-')}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        {loading ? (
          <div className="text-center py-20" data-testid="loading-state">
            <div className="inline-block w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 font-semibold">Loading vendors...</p>
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-slate-900/10" data-testid="no-vendors">
            <p className="text-xl text-slate-600 font-semibold mb-2">No vendors found</p>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="vendors-grid">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDiscovery;