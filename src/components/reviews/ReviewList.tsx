import React from 'react';
import { Star } from 'lucide-react';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  sessionId: string;
  rating: number;
  comment: string;
  createdAt: string;
  tags: string[];
}

interface Session {
  id: string;
  coachName: string;
  topic: string;
  date: string;
  isReviewed: boolean;
  review?: Review;
}

interface ReviewListProps {
  sessions: Session[];
  onSubmitReview: (sessionId: string, review: Partial<Review>) => Promise<void>;
}

export default function ReviewList({ sessions, onSubmitReview }: ReviewListProps) {
  const pendingReviews = sessions.filter(session => !session.isReviewed);
  const completedReviews = sessions.filter(session => session.isReviewed);

  return (
    <div className="space-y-6">
      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pending Reviews ({pendingReviews.length})
          </h3>
          <div className="space-y-4">
            {pendingReviews.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900">{session.topic}</h4>
                  <p className="text-sm text-gray-500">
                    Session with {session.coachName} on {new Date(session.date).toLocaleDateString()}
                  </p>
                </div>
                <ReviewForm onSubmit={(review) => onSubmitReview(session.id, review)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Reviews */}
      {completedReviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Reviews ({completedReviews.length})
          </h3>
          <div className="space-y-4">
            {completedReviews.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900">{session.topic}</h4>
                  <p className="text-sm text-gray-500">
                    Session with {session.coachName} on {new Date(session.date).toLocaleDateString()}
                  </p>
                </div>
                {session.review && (
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < session.review!.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{session.review.comment}</p>
                    {session.review.tags && session.review.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {session.review.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => onSubmitReview(session.id, session.review!)}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}