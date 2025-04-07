import React from 'react';
import { Star, TrendingUp, MessageSquare } from 'lucide-react';

interface ReviewStatsProps {
  totalReviews: number;
  averageRating: number;
  completionRate: number;
}

export default function ReviewStats({
  totalReviews,
  averageRating,
  completionRate
}: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <Star className="h-8 w-8 text-yellow-400" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {(completionRate * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}