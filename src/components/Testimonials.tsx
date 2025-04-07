import React from 'react';
import { Star } from 'lucide-react';
import useFetch from '../hooks/useFetch';

interface Testimonial {
  sessionId: string; 
  userId: {
    _id: string;
    name: string;
    role:string;
    image:string;
  };    
  coachId: {
    _id: string;
    name: string;
    role: string;
    image: string;
    rating: number;
  };   
  rating: number;      
  comment: string;     
  createdAt: string;   
  updatedAt: string;   
}

interface TestimonialsProps {
  url?: string;
}

export default function Testimonials({ url = '/api/reviews/getreviews' }: TestimonialsProps) {
  const { data, loading, error } = useFetch<Testimonial[]>(url);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No testimonials found.</p>;
  const displayedReviews = url === '/api/reviews/getreviews' ? data.slice(0, 2) : data;
  

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Success stories from developers who transformed their careers
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {displayedReviews.map((testimonial) => (
            <div
              key={testimonial.sessionId}
              className="flex flex-col justify-between bg-gray-50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(Math.round(testimonial.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.coachId.image}
                  alt={testimonial.coachId.name}
                />
                <div className="ml-4">
                  <h4 className="text-base font-semibold text-gray-900">{testimonial.coachId.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.coachId.role}</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 italic mb-6">{testimonial.comment}</p>
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.userId.image}
                  alt={testimonial.userId.name}
                />
                <div className="ml-4">
                  <h4 className="text-base font-semibold text-gray-900">{testimonial.userId.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.userId.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
