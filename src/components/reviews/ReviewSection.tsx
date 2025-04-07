import React, { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ReviewStats from './ReviewStats';

interface Review {
  _id: string;
  sessionId: string;
  rating: number;
  comment: string;
  createdAt: string;
  coachId : string;
  userId : string;
  
}

interface Session {
  id: string;
  coachName: string;
  topic: string;
  date: string;
  status : string;
  isReviewed: boolean;
  review?: Review;
}

export default function ReviewSection() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/session/getsessionForUser/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch sessions');
      
      const data = await response.json();
      const completedSessions = data.filter(
        (session:any) => session.status === "completed"
      )
      setSessions(completedSessions);
    } catch (err) {
      setError('Failed to load sessions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (sessionId: string, review: Partial<Review>) => {
    try {
      const response = await fetch(`/api/reviews/addreview/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },

        body: JSON.stringify(review)
      });

      if (!response.ok) throw new Error('Failed to submit review');

      // Refresh sessions to show updated review
      await fetchSessions();
    } catch (err) {
      console.error('Error submitting review:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  const reviewedSessions = sessions.filter(s => s.isReviewed);
  const stats = {
    totalReviews: reviewedSessions.length,
    averageRating: reviewedSessions.reduce((acc, s) => acc + (s.review?.rating || 0), 0) / 
                   (reviewedSessions.length || 1),
    completionRate: reviewedSessions.length / (sessions.length || 1)
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Session Reviews</h2>
      <ReviewStats {...stats} />
      <ReviewList
        sessions={sessions}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}