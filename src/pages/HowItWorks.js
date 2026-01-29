import { CheckCircle, Search, ThumbsUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen" data-testid="how-it-works-page">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-center" data-testid="page-title">
            How StreetCred Works
          </h1>
          <p className="text-center text-lg text-slate-300 max-w-2xl mx-auto">
            A simple, transparent system to verify street vendor legitimacy through community trust.
          </p>
        </div>
      </div>

      {/* The Problem */}
      <div className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-slate-900 text-center">The Problem</h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Every day, millions of people buy from street vendors - food stalls, mobile repair shops, clothing sellers,
              and service providers. But there's a constant question:
            </p>
            <p className="text-2xl font-bold text-center text-slate-900 my-6">
              "Is this vendor legitimate and safe to buy from?"
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                People hesitate and avoid buying
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                Legitimate vendors lose customers due to lack of trust
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                No easy way to verify vendor authenticity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                Community knowledge about vendors is scattered
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="py-16">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-slate-900 text-center">The Solution</h2>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 mb-12">
            <p className="text-lg text-slate-700 leading-relaxed text-center">
              StreetCred provides a simple platform where vendors can register and customers can verify legitimacy through{' '}
              <strong>community trust signals</strong> - not ratings, not reviews, but real indicators of trustworthiness.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {/* For Buyers */}
            <div>
              <h3 className="text-2xl font-bold uppercase mb-6 text-slate-900 flex items-center gap-3">
                <Users size={28} />
                For Buyers
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-search-vendor">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Search size={24} className="text-slate-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">1. Search for Vendors</h4>
                      <p className="text-slate-700 leading-relaxed">
                        Use our search to find vendors by name, location, or business type. Browse the community directory
                        to discover registered vendors in your area.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-check-trust">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">2. Check Trust Level</h4>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        Every vendor has a trust level based on community signals and time in operation:
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li>
                          <strong>Newcomer:</strong> Recently registered, building trust
                        </li>
                        <li>
                          <strong>Regular:</strong> Established presence with positive signals
                        </li>
                        <li>
                          <strong>Community Pillar:</strong> Long-standing, highly trusted vendor
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow" data-testid="step-add-signal">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <ThumbsUp size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">3. Add Trust Signals</h4>
                      <p className="text-slate-700 leading-relaxed">
                        After a positive experience, add a trust signal to help others. Your signal contributes to the
                        vendor's trust level and helps the community make informed decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* For Vendors */}
            <div className="pt-8 border-t-2 border-slate-900/10">
              <h3 className="text-2xl font-bold uppercase mb-6 text-slate-900 flex items-center gap-3">
                <Users size={28} />
                For Vendors
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 font-black text-slate-900">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">Register Your Business</h4>
                      <p className="text-slate-700 leading-relaxed">
                        Fill out a simple registration form with your business name, type, location, and description. It's
                        completely free.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">Get Your QR Code</h4>
                      <p className="text-slate-700 leading-relaxed">
                        Receive a unique QR code that customers can scan to instantly view your profile and trust level.
                        Display it proudly at your stall!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-slate-900/10 hard-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white">
                      3
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-slate-900">Build Your Trust</h4>
                      <p className="text-slate-700 leading-relaxed">
                        As you serve customers well, they'll add trust signals to your profile. Over time, you'll progress
                        from Newcomer to Community Pillar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We're NOT */}
      <div className="py-16 bg-slate-900 text-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-center">What We're NOT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border-2 border-white/10">
              <p className="text-lg">
                <span className="text-red-400 font-bold">✗</span> We're NOT a payment or booking platform
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border-2 border-white/10">
              <p className="text-lg">
                <span className="text-red-400 font-bold">✗</span> We're NOT a rating or review site
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border-2 border-white/10">
              <p className="text-lg">
                <span className="text-red-400 font-bold">✗</span> We DON'T manage vendor licenses
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border-2 border-white/10">
              <p className="text-lg">
                <span className="text-red-400 font-bold">✗</span> We DON'T enforce rules or issue fines
              </p>
            </div>
          </div>
          <p className="text-center text-lg mt-8 text-slate-300">
            We focus solely on <strong className="text-amber-500">legitimacy visibility and trust signals</strong> to
            help the community make informed decisions.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-slate-900">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/discover" data-testid="cta-discover">
              <button className="btn-secondary hard-shadow px-8 py-4 text-base">Find Vendors</button>
            </Link>
            <Link to="/register" data-testid="cta-register">
              <button className="btn-primary px-8 py-4 text-base">Register as Vendor</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;