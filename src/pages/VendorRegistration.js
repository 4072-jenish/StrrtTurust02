import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store, MapPin, Phone, FileText } from 'lucide-react';

// Fallback to local backend during development when env var is not set
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`; 

const VendorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    businessType: 'Food Stall',
    address: '',
    phone: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axios.post(`${API}/vendors`, {
        name: formData.name,
        businessType: formData.businessType,
        location: {
          address: formData.address,
          coordinates: { lat: 0, lng: 0 }
        },
        phone: formData.phone,
        description: formData.description
      });

      alert('Vendor registered successfully!');
      const id = response.data?.id;
      if (id) {
        navigate(`/vendor/${id}`);
      } else {
        console.warn('Registration response missing id:', response.data);
        alert('Vendor registered but could not redirect (missing id). Please check the vendor list.');
      }
    } catch (error) {
      console.error('Error registering vendor:', error);
      const message = error.response?.data?.error || error.message || 'Failed to register vendor. Please try again.';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8" data-testid="vendor-registration-page">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-slate-900" data-testid="page-title">
            Register as Vendor
          </h1>
          <p className="text-lg text-slate-600">
            Join StreetCred to establish your legitimacy and build trust with your community.
          </p>
        </div>

        <div className="bg-white rounded-xl border-2 border-slate-900/10 p-8 hard-shadow">
          <form onSubmit={handleSubmit} data-testid="registration-form">
            <div className="space-y-6">
              {/* Vendor Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase text-slate-700 mb-2">
                  <Store size={18} />
                  Vendor Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Joe's Tacos"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                  data-testid="name-input"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-amber-500 transition-colors"
                  data-testid="business-type-select"
                >
                  <option value="Food Stall">Food Stall</option>
                  <option value="Mobile Repair">Mobile Repair</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase text-slate-700 mb-2">
                  <MapPin size={18} />
                  Location *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Main Street corner, near City Park"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                  data-testid="address-input"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase text-slate-700 mb-2">
                  <Phone size={18} />
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +1234567890"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                  data-testid="phone-input"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold uppercase text-slate-700 mb-2">
                  <FileText size={18} />
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell customers about your business..."
                  rows="4"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  data-testid="description-input"
                ></textarea>
              </div>

              {/* Info Box */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Note:</strong> After registration, you'll receive a unique QR code that customers can scan to
                  verify your legitimacy. Share it proudly!
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base" data-testid="submit-registration-btn">
                {submitting ? 'Registering...' : 'Register Vendor'}
              </button>
            </div>
          </form>
        </div>

        {/* Why Register Section */}
        <div className="mt-8 bg-slate-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold uppercase mb-4">Why Register?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Build trust with potential customers through community verification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Get a unique QR code for easy customer verification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Increase visibility in the community marketplace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Free registration - no hidden fees</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;