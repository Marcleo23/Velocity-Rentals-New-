import React from 'react';
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="bg-black dark:bg-white p-2 rounded-xl transition-transform group-hover:rotate-12">
                <Car className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter dark:text-white">VELOCITY</span>
            </div>
            <p className="text-sm text-black/40 dark:text-white/40 font-medium leading-relaxed">
              Redefining premium mobility with a curated fleet of extraordinary vehicles. Experience the future of car rentals today.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 dark:text-white/20 mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                >
                  Fleet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bookings')}
                  className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('profile')}
                  className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 dark:text-white/20 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-black/20 dark:text-white/20" />
                <span className="text-sm font-bold text-black/60 dark:text-white/60">hello@velocity.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-black/20 dark:text-white/20" />
                <span className="text-sm font-bold text-black/60 dark:text-white/60">+237-653-667-492</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-black/20 dark:text-white/20 mt-0.5" />
                <span className="text-sm font-bold text-black/60 dark:text-white/60">
                  Yaounde, Cameroon
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 dark:text-white/20 mb-6">Newsletter</h4>
            <p className="text-sm text-black/40 dark:text-white/40 font-medium mb-4">
              Subscribe to get special offers and fleet updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 px-4 py-2 bg-black/5 dark:bg-white/5 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 outline-none dark:text-white"
              />
              <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">
            © {currentYear} VELOCITY CAR RENTALS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
