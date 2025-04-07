import React from 'react';
import useFetch from '../hooks/useFetch';
import { Star, Clock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

interface CoachProps {
    _id: string;
    name: string;
    role: string;
    image: string;
    rating: number;
    reviewCount: number;
    specializations: string[];
    hourlyRate: number;
}

export default function Coach({ _id, name, role, image, rating, reviewCount, specializations, hourlyRate }: CoachProps) {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const handleBookSession = (_id: string) => {
        if (isLoggedIn) {
            navigate(`/booking/${_id}`);
        } else {
            navigate('/login');
        }
    };
    const handleViewProfile = (_id: string) => {
        if (isLoggedIn) {
            navigate(`/coach/${_id}`);
        } else {
            navigate('/login');
        }
    };
    return (
        <div key={_id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition hover:shadow-xl">
            <div className="p-6">
                <div className="flex items-center">
                    <img className="h-16 w-16 rounded-full object-cover" src={image} alt={name} />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({reviewCount} reviews)</span>
                </div>

                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Specialties</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {specializations.map((specialty) => (
                            <span key={specialty} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="ml-1 text-sm">${hourlyRate}/hour</span>
                    </div>
                    <button
                        onClick={() => handleBookSession(_id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        Book Session
                    </button>
                    <button
                        onClick={() => handleViewProfile(_id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
