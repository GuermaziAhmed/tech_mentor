import React from 'react';
import { ArrowRight, Star, Users, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleStartLearning = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Master the IT Skills with Expert Coaches
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Accelerate your development journey with personalized 1-on-1 coaching from industry experts.
            Learn MongoDB, Express, React, and Node.js from professionals who've been there.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleStartLearning}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <Link
              to="/search"
              className="rounded-lg bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Browse Coaches
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mt-4 font-semibold text-gray-900">Expert Coaches</h2>
              <p className="mt-2 text-sm text-gray-500">Verified professionals with real-world experience</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mt-4 font-semibold text-gray-900">1-on-1 Sessions</h2>
              <p className="mt-2 text-sm text-gray-500">Personalized attention and guidance</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mt-4 font-semibold text-gray-900">Flexible Schedule</h2>
              <p className="mt-2 text-sm text-gray-500">Book sessions at your convenience</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-green-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}