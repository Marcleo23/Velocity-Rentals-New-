import React, { useState } from 'react';
import { Car, User, LogOut, LayoutDashboard, Calendar, Sun, Moon, Menu, X } from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: any;
  userProfile: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  isAdmin: boolean;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  userProfile,
  onLogin, 
  onLogout, 
  isAdmin, 
  onNavigate,
  currentPage 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-screen bg-white dark:bg-black' : 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5'} px-6 py-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer z-50" 
          onClick={() => handleNavigate('home')}
        >
          <div className="bg-black dark:bg-white p-2 rounded-lg">
            <Car className="text-white dark:text-black w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">VELOCITY</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavigate('home')}
            className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
          >
            Fleet
          </button>
          {user && (
            <button 
              onClick={() => handleNavigate('bookings')}
              className={`text-sm font-medium transition-colors ${currentPage === 'bookings' ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
            >
              {userProfile?.role === 'admin' ? 'Bookings' : 'My Bookings'}
            </button>
          )}
          {user && (
            <button 
              onClick={() => handleNavigate('profile')}
              className={`text-sm font-medium transition-colors ${currentPage === 'profile' ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
            >
              Profile
            </button>
          )}
          {isAdmin && (
            <button 
              onClick={() => handleNavigate('admin')}
              className={`text-sm font-medium transition-colors ${currentPage === 'admin' ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
            >
              Admin
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 z-50">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <User className="w-4 h-4 text-black/40 dark:text-white/40" />
                    </div>
                  )}
                  <span className="text-sm font-medium dark:text-white">{userProfile?.displayName || user.displayName}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-black/60 dark:text-white/60" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[72px] bg-white dark:bg-black z-40 overflow-y-auto px-6 py-8"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-2">Navigation</p>
                <button 
                  onClick={() => handleNavigate('home')}
                  className={`text-3xl font-bold text-left transition-colors ${currentPage === 'home' ? 'text-black dark:text-white' : 'text-black/20 dark:text-white/20'}`}
                >
                  Fleet
                </button>
                {user && (
                  <button 
                    onClick={() => handleNavigate('bookings')}
                    className={`text-3xl font-bold text-left transition-colors ${currentPage === 'bookings' ? 'text-black dark:text-white' : 'text-black/20 dark:text-white/20'}`}
                  >
                    {userProfile?.role === 'admin' ? 'Bookings' : 'My Bookings'}
                  </button>
                )}
                {user && (
                  <button 
                    onClick={() => handleNavigate('profile')}
                    className={`text-3xl font-bold text-left transition-colors ${currentPage === 'profile' ? 'text-black dark:text-white' : 'text-black/20 dark:text-white/20'}`}
                  >
                    Profile
                  </button>
                )}
                {isAdmin && (
                  <button 
                    onClick={() => handleNavigate('admin')}
                    className={`text-3xl font-bold text-left transition-colors ${currentPage === 'admin' ? 'text-black dark:text-white' : 'text-black/20 dark:text-white/20'}`}
                  >
                    Admin
                  </button>
                )}
              </div>

              <div className="pt-8 border-t border-black/5 dark:border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-6">Account</p>
                {user ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full border-2 border-black/10 dark:border-white/10" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                          <User className="w-6 h-6 text-black/40 dark:text-white/40" />
                        </div>
                      )}
                      <div>
                        <p className="text-xl font-bold dark:text-white">{userProfile?.displayName || user.displayName}</p>
                        <p className="text-sm text-black/40 dark:text-white/40">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={onLogin}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 dark:shadow-white/5"
                  >
                    Sign In to Velocity
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};
