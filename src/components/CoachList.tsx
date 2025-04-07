import React from 'react';
import useFetch from '../hooks/useFetch';
import { Star, Clock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Coach from './Coache';

interface Coach {
  _id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  hourlyRate: number;
}


export default function CoachList() {
  const navigate = useNavigate();
  
  const { data, loading, error } = useFetch<Coach[]>('/api/coaches/getCoaches');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Add a null check for data
  if (!data) return <p>No coaches found.</p>;

  // Limit to 6 coaches
  const displayedCoaches = data.slice(0, 6);
 
  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Learn from Top IT Experts
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our coaches are carefully selected industry professionals with proven experience
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {displayedCoaches.map((coach ) => (
            <Coach 
            _id={coach._id} 
            name={coach.name} 
            role={coach.role} 
            image={coach.image} 
            hourlyRate={coach.hourlyRate}
            rating={coach.rating}
            reviewCount={coach.reviewCount}
            specializations={coach.specializations}
            />

          ))}
        </div>
      </div>
    </div>
  );
}