import React, { useState, useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Coach from '../components/Coache';

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
}

const technologies = ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'Next.js'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

export default function CoachSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [minRate, setMinRate] = useState<string>('');
  const [maxRate, setMaxRate] = useState<string>('');
  const [rating, setRating] = useState<number | ''>('');
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoaches();
  }, [searchTerm, selectedTech, minRate, maxRate, rating]);

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (searchTerm) queryParams.append('name', searchTerm);
      if (selectedTech.length) queryParams.append('specialization', selectedTech.join(' '));
      if (minRate) queryParams.append('minRate', minRate);
      if (maxRate) queryParams.append('maxRate', maxRate);
      if (rating) queryParams.append('rating', rating.toString());

      const response = await fetch(`/api/coaches/getCoaches?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setCoaches(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching coaches:', error);
      setCoaches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Coach</h1>
        <p className="mt-2 text-gray-600">Filter by technology, experience level, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h2>

            <div className="space-y-4">
              {/* Technologies Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                <div className="space-y-2">
                  {technologies.map((tech) => (
                    <label key={tech} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTech.includes(tech)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTech([...selectedTech, tech]);
                          } else {
                            setSelectedTech(selectedTech.filter((t) => t !== tech));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Min and Max Rate Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minRate}
                    onChange={(e) => setMinRate(e.target.value)}
                    className="w-1/2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    className="w-1/2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <input
                  type="number"
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min="0"
                  max="5"
                  className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : coaches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coaches.map((coach) => (
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
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No coaches found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
