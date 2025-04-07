import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Calendar, ChevronRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
interface Coach {
  _id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  hourlyRate: number;
  bio: string;
  availability: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
}

export default function CoachProfile() {
  const { id } = useParams();
  const [coach, setCoach] = useState<Coach | null>(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const { data, loading, error } = useFetch<Coach>(`/api/coaches/getCoach/${id}`);

  useEffect(() => {
    if (data) {
      setCoach(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;
  if (!coach) return <p>No coaches found.</p>;

  const handelScheduleSession = (_id: string) => {
    if (isLoggedIn) {
      navigate(`/booking/${_id}`);
    } else {
      navigate('/login');
    }
  };
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{coach.name}</h1>
                  <p className="text-gray-600">{coach.role}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{coach.rating}</span>
                    <span className="ml-1 text-gray-500">({coach.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${coach.hourlyRate}</p>
                <p className="text-sm text-gray-500">per hour</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">About</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{coach.bio}</p>
            </div>

            {/* Specializations */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Specializations</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {coach.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900">Book a Session</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>60 minute session</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Availability:</span>
                </div>
                <div className="pl-7">
                  {coach.availability.map((avail, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        {avail.day}:
                      </p>
                      {avail.slots.length > 0 ? (
                        <ul className="text-sm text-gray-600 pl-4 list-disc">
                          {avail.slots.map((slot, slotIndex) => (
                            <li key={slotIndex}>
                              {slot.startTime} - {slot.endTime}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 pl-4">No slots available</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => handelScheduleSession(coach._id)}
              className="mt-6 w-full btn-primary">
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </div>
    <Testimonials url={`/api/reviews/getreviewByCoachId/${coach._id}`} />
    </>
  );
}
