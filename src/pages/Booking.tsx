import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, MessageSquare, AlertCircle } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';
import BookingConfirmation from '../components/BookingConfirmation';
import SessionDetails from '../components/SessionDetails';

type SessionType = 'video' | 'chat';
type Duration = 30 | 60 | 120;

interface Coach {
  id: string;
  name: string;
  hourlyRate: number;
  image: string;
}

interface BookingDetails {
  topic: string;
  duration: Duration;
  type: SessionType;
  date: string;
  time: string;
}

export default function Booking() {
  const userId = localStorage.getItem('userId');
  const data = useParams();
  console.log(data);
  const { coachId } = useParams();
  console.log(coachId);
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    topic: '',
    duration: 60,
    type: 'video',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    fetchCoachDetails();
  }, [coachId]);

  const fetchCoachDetails = async () => {
    try {
      const response = await fetch(`/api/coaches/getCoach/${coachId}`);
      if (!response.ok) throw new Error('Failed to fetch coach details');
      const data = await response.json();
      setCoach(data);
    } catch (err) {
      setError('Could not load coach details');
    }
  };

  const validateBooking = (): boolean => {
    if (!bookingDetails.topic.trim()) {
      setError('Please enter a session topic');
      return false;
    }
    if (!bookingDetails.date) {
      setError('Please select a date');
      return false;
    }
    if (!bookingDetails.time) {
      setError('Please select a time');
      return false;
    }
    return true;
  };

  const handleBooking = async () => {
    if (!validateBooking()) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/booking/${coachId}` } });
        return;
      }

      const response = await fetch('/api/session/addsession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          coachId,
          ...bookingDetails,
          amount: calculateAmount(bookingDetails.duration, coach?.hourlyRate || 0)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Booking failed');
      }

      const session = await response.json();
      navigate('/dashboard', { 
        state: { 
          message: 'Booking confirmed! Check your dashboard for session details.',
          session 
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book session');
    } finally {
      setLoading(false);
    }
  };

  const calculateAmount = (duration: Duration, hourlyRate: number): number => {
    return (duration / 60) * hourlyRate;
  };

  const updateBookingDetails = (field: keyof BookingDetails, value: any) => {
    setBookingDetails(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user makes changes
  };

  if (!coach) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Schedule Your Session</h1>
          <p className="mt-2 text-gray-600">Book a session with {coach.name}</p>
        </div>

        {error && (
          <div className="mx-6 mt-6">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Details (Topic and Duration) */}
        <SessionDetails
          topic={bookingDetails.topic}
          duration={bookingDetails.duration}
          onTopicChange={(topic) => updateBookingDetails('topic', topic)}
          onDurationChange={(duration) => updateBookingDetails('duration', duration)}
        />

        {/* Session Type Selection */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => updateBookingDetails('type', 'video')}
              className={`flex items-center p-4 border rounded-lg ${
                bookingDetails.type === 'video' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <Video className={`h-5 w-5 ${bookingDetails.type === 'video' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="ml-2 font-medium">Video Session</span>
            </button>
            <button
              onClick={() => updateBookingDetails('type', 'chat')}
              className={`flex items-center p-4 border rounded-lg ${
                bookingDetails.type === 'chat' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <MessageSquare className={`h-5 w-5 ${bookingDetails.type === 'chat' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="ml-2 font-medium">Chat Consultation</span>
            </button>
          </div>
        </div>

        {/* Calendar */}
        <BookingCalendar
          selectedDate={bookingDetails.date}
          selectedTime={bookingDetails.time}
          onDateSelect={(date) => updateBookingDetails('date', date)}
          onTimeSelect={(time) => updateBookingDetails('time', time)}
        />

        {/* Booking Summary */}
        <BookingConfirmation
          coach={coach}
          bookingDetails={bookingDetails}
          onConfirm={handleBooking}
          loading={loading}
        />
      </div>
    </div>
  );
}