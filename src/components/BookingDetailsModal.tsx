import React from 'react';
import { X, Calendar, MapPin, CreditCard, Car as CarIcon, User, ShieldCheck, Info } from 'lucide-react';
import { Booking, Car, BookingStatus } from '../types';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: (Booking & { car?: Car; userEmail?: string }) | null;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const getStatusStyles = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case BookingStatus.PENDING: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case BookingStatus.CANCELLED: return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case BookingStatus.COMPLETED: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-black/5 text-black/40 border-black/10';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-black rounded-[40px] shadow-2xl overflow-hidden border border-black/5 dark:border-white/5 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Rental Details</h2>
            <p className="text-sm text-black/40 dark:text-white/60 font-medium">Booking ID: {booking.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-black/40 dark:text-white/60" />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Car Info */}
            <div className="space-y-6">
              <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-3xl overflow-hidden">
                {booking.car && (
                  <img 
                    src={booking.car.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/60">
                    {booking.car?.category}
                  </span>
                  <div className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-widest ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>
                <h3 className="text-xl font-bold dark:text-white">{booking.car?.make} {booking.car?.model}</h3>
                <p className="text-sm text-black/40 dark:text-white/60 font-medium">{booking.car?.year} • {booking.car?.transmission} • {booking.car?.fuelType}</p>
              </div>

              <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium dark:text-white/70">Full Insurance Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium dark:text-white/70">Unlimited Mileage</span>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Details */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-black/40 dark:text-white/60" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/40 uppercase tracking-widest block mb-1">Rental Period</span>
                    <p className="text-sm font-bold dark:text-white">
                      {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="mx-2 text-black/20 dark:text-white/40">→</span>
                      {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-black/40 dark:text-white/60" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/40 uppercase tracking-widest block mb-1">Customer Info</span>
                    <p className="text-sm font-bold dark:text-white">{booking.userEmail}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/60 font-medium">UID: {booking.userId}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-black/40 dark:text-white/60" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/40 uppercase tracking-widest block mb-1">Payment Summary</span>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold dark:text-white">${booking.totalPrice}</p>
                      <span className="text-xs text-black/40 dark:text-white/60 font-medium">Total Paid</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-black/40 dark:text-white/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/60">Pickup Location</span>
                </div>
                <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl">
                  <p className="text-sm font-bold dark:text-white">Velocity Central Hub</p>
                  <p className="text-xs text-black/40 dark:text-white/60 font-medium">123 Rental Drive, Airport District</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 flex items-center justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-bold hover:opacity-90 transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
