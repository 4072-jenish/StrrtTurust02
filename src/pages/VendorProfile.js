import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TrustBadge from '../components/TrustBadge';
import { MapPin, Phone, Calendar, ArrowLeft, ThumbsUp } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VendorProfile = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [recentSignals, setRecentSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signalType, setSignalType] = useState('verified_purchase');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/vendors/${id}`);
      setVendor(response.data.vendor);
      setRecentSignals(response.data.recentSignals || []);
    } catch (error) {
      console.error('Error fetching vendor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSignal = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`${API}/vendors/${id}/signal`, {
        signalType,
        comment
      });
      setComment('');
      fetchVendor();
      alert('Thank you for adding your trust signal!');
    } catch (error) {
      console.error('Error adding signal:', error);
      alert('Failed to add signal. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-state">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-semibold">Loading vendor...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="vendor-not-found">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Vendor Not Found</h2>
          <Link to="/discover">
            <button className="btn-primary">Back to Discovery</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" data-testid="vendor-profile-page">
      <div className="container">
        <Link to="/discover" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors" data-testid="back-link">
          <ArrowLeft size={20} />
          Back to Discovery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border-2 border-slate-900/10 p-8 hard-shadow" data-testid="vendor-main-info">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-slate-900" data-testid="vendor-name">
                    {vendor.name}
                  </h1>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <TrustBadge level={vendor.trustLevel} signalsCount={vendor.communitySignalsCount} />
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm font-mono font-bold uppercase text-slate-700">
                      {vendor.businessType}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-slate-700">
                      <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                      <span>{vendor.location?.address || 'Location not specified'}</span>
                    </div>
                    {vendor.phone && (
                      <div className="flex items-center gap-3 text-slate-700">
                        <Phone size={20} className="flex-shrink-0" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-slate-700">
                      <Calendar size={20} className="flex-shrink-0" />
                      <span className="font-mono text-sm">
                        Registered: {new Date(vendor.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {vendor.description && (
                <div className="border-t-2 border-slate-900/10 pt-6">
                  <h3 className="text-lg font-bold uppercase mb-3 text-slate-900">About</h3>
                  <p className="text-slate-700 leading-relaxed">{vendor.description}</p>
                </div>
              )}
            </div>

            {/* Add Trust Signal */}
            <div className="bg-white rounded-xl border-2 border-slate-900/10 p-8 hard-shadow" data-testid="add-signal-form">
              <h2 className="text-2xl font-bold uppercase mb-4 text-slate-900">Add Trust Signal</h2>
              <p className="text-slate-600 mb-6">
                Had a positive experience with this vendor? Help others by adding a trust signal.
              </p>
              <form onSubmit={handleAddSignal}>
                <div className="mb-4">
                  <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Signal Type</label>
                  <select
                    value={signalType}
                    onChange={(e) => setSignalType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-amber-500 transition-colors"
                    data-testid="signal-type-select"
                  >
                    <option value="verified_purchase">Verified Purchase</option>
                    <option value="positive_interaction">Positive Interaction</option>
                    <option value="recommended">Recommended</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Comment (Optional)</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    rows="3"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    data-testid="signal-comment-input"
                  ></textarea>
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full" data-testid="submit-signal-btn">
                  {submitting ? 'Submitting...' : 'Add Trust Signal'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-xl border-2 border-slate-900/10 p-6 text-center hard-shadow" data-testid="qr-code-section">
              <h3 className="text-lg font-bold uppercase mb-4 text-slate-900">Vendor QR Code</h3>
              <img src={vendor.qrCode} alt="Vendor QR Code" className="w-48 h-48 mx-auto mb-4 border-2 border-slate-200" data-testid="qr-code-image" />
              <p className="text-xs text-slate-600 font-mono">{vendor.id}</p>
            </div>

            {/* Recent Signals */}
            <div className="bg-white rounded-xl border-2 border-slate-900/10 p-6 hard-shadow" data-testid="recent-signals">
              <h3 className="text-lg font-bold uppercase mb-4 text-slate-900 flex items-center gap-2">
                <ThumbsUp size={20} />
                Recent Signals
              </h3>
              {recentSignals.length === 0 ? (
                <p className="text-slate-500 text-sm">No signals yet. Be the first!</p>
              ) : (
                <div className="space-y-3">
                  {recentSignals.slice(0, 5).map((signal) => (
                    <div key={signal.id} className="border-l-4 border-emerald-500 pl-3 py-2" data-testid={`signal-${signal.id}`}>
                      <div className="text-xs font-mono uppercase text-slate-600 mb-1">
                        {signal.signalType.replace('_', ' ')}
                      </div>
                      {signal.comment && <p className="text-sm text-slate-700">{signal.comment}</p>}
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(signal.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;