import { Link } from 'react-router-dom';
import TrustBadge from './TrustBadge';
import { MapPin, ShoppingBag } from 'lucide-react';

export const VendorCard = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor.id}`} data-testid={`vendor-card-${vendor.id}`}>
      <div className="bg-white border-2 border-slate-900/10 rounded-xl overflow-hidden hover:border-slate-900/30 transition-all group hard-shadow">
        <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative overflow-hidden">
          <ShoppingBag size={64} className="text-amber-600/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
              {vendor.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-3 text-slate-600">
            <MapPin size={16} />
            <span className="text-sm">{vendor.location?.address || 'Location not specified'}</span>
          </div>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{vendor.description || 'No description available'}</p>
          <div className="flex items-center justify-between">
            <TrustBadge level={vendor.trustLevel} signalsCount={vendor.communitySignalsCount} />
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider">{vendor.businessType}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;