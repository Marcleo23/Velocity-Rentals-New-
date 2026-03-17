import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, ChevronRight, Filter } from 'lucide-react';
import { Booking, Car, BookingStatus } from '../types';

interface MyBookingsProps {
  bookings: (Booking & { car?: Car })[];
  onCancel?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
  isAdmin?: boolean;
}

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onCancel, onUpdateStatus, isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'successful' | 'cancelled'>('pending');

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-emerald-500';
      case BookingStatus.PENDING: return 'bg-amber-500';
      case BookingStatus.CANCELLED: return 'bg-rose-500';
      case BookingStatus.COMPLETED: return 'bg-blue-500';
      default: return 'bg-black/40';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return <CheckCircle2 className="w-3 h-3" />;
      case BookingStatus.CANCELLED: return <XCircle className="w-3 h-3" />;
      case BookingStatus.PENDING: return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'pending') return booking.status === BookingStatus.PENDING;
    if (activeTab === 'successful') return booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.COMPLETED;
    if (activeTab === 'cancelled') return booking.status === BookingStatus.CANCELLED;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 dark:text-white">
            {isAdmin ? 'All Bookings' : 'My Bookings'}
          </h1>
          <p className="text-black/40 dark:text-white/40 font-medium">
            {isAdmin ? 'Manage all customer rentals' : 'Manage your current and past rentals'}
          </p>
        </div>

        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'pending' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
          >
            Pending
            <span className="opacity-40">{bookings.filter(b => b.status === BookingStatus.PENDING).length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('successful')}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'successful' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
          >
            Successful
            <span className="opacity-40">{bookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.COMPLETED).length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'cancelled' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
          >
            Cancelled
            <span className="opacity-40">{bookings.filter(b => b.status === BookingStatus.CANCELLED).length}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-[32px] border border-dashed border-black/10 dark:border-white/10">
            <p className="text-black/40 dark:text-white/40 font-medium">No {activeTab} bookings found.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="group bg-white dark:bg-black p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5">
              <div className="w-full md:w-48 aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
                {booking.car && (
                  <img src={booking.car.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold dark:text-white">{booking.car?.make} {booking.car?.model}</h3>
                    {isAdmin && booking.userEmail && (
                      <span className="text-xs text-black/40 dark:text-white/40 font-medium">{booking.userEmail}</span>
                    )}
                  </div>
                  {isAdmin ? (
                    <select 
                      value={booking.status}
                      onChange={(e) => onUpdateStatus?.(booking.id, e.target.value)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider border-none outline-none focus:ring-2 focus:ring-white/20 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">Pickup</span>
                    <div className="flex items-center gap-2 text-sm font-medium dark:text-white/80">
                      <Calendar className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
                      {new Date(booking.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">Return</span>
                    <div className="flex items-center gap-2 text-sm font-medium dark:text-white/80">
                      <Calendar className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
                      {new Date(booking.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">Total</span>
                    <div className="text-sm font-bold dark:text-white">${booking.totalPrice}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
                {(booking.status === BookingStatus.PENDING || booking.status === BookingStatus.CONFIRMED) && (
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this booking?')) {
                        onCancel?.(booking.id);
                      }
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
