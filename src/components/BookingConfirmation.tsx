import React from 'react';

interface Coach {
  id: string;
  name: string;
  hourlyRate: number;
  image: string;
}

interface BookingDetails {
  topic: string;
  duration: number;
  type: 'video' | 'chat';
  date: string;
  time: string;
}

interface BookingConfirmationProps {
  coach: Coach;
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  loading: boolean;
}

export default function BookingConfirmation({
  coach,
  bookingDetails,
  onConfirm,
  loading
}: BookingConfirmationProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    return (bookingDetails.duration / 60) * coach.hourlyRate;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-b-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Topic</span>
          <span className="font-medium">{bookingDetails.topic || 'Not specified'}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Session Type</span>
          <span className="font-medium">
            {bookingDetails.type === 'video' ? 'Video Call' : 'Chat Consultation'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">{bookingDetails.duration} minutes</span>
        </div>
        
        {bookingDetails.date && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{formatDate(bookingDetails.date)}</span>
          </div>
        )}
        
        {bookingDetails.time && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Time</span>
            <span className="font-medium">{bookingDetails.time}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Rate</span>
          <span className="font-medium">${coach.hourlyRate}/hour</span>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${calculateTotal()}</p>
            </div>
            <button
              onClick={onConfirm}
              disabled={loading || !bookingDetails.date || !bookingDetails.time || !bookingDetails.topic}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}