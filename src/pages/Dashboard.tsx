import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Clock, Award } from 'lucide-react';
import { format } from 'date-fns';
import ReviewSection from '../components/reviews/ReviewSection';
interface Session {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  coachId: {
    _id: string,
    name: string,
    role: string,
    image: string,
    rating: number

  };
  date: Date;
  duration: number;
  type: string;
  status: string;
  topic: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

interface CompletedSession {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  coachId: {
    _id: string,
    name: string,
    role: string,
    image: string,
    rating: number

  };
  date: Date;
  duration: number;
  type: string;
  status: string;
  topic: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([]);

  const totalLearningHours = completedSessions.reduce((sum, session) => sum + session.duration, 0);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const response = await fetch(`/api/session/getsessionForUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);

        const currentDate = new Date();

        // Update outdated sessions on the server
        const outdatedSessions = data.filter(
          (session: any) =>
            session.status === 'scheduled' && new Date(session.date) < currentDate
        );

        if (outdatedSessions.length > 0) {
          await Promise.all(
            outdatedSessions.map(async (session: any) => {
              await fetch(`/api/session/updatesession/${session._id}`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'completed' }),
              });
            })
          );
        }

        // Re-fetch updated sessions
        const updatedResponse = await fetch(`/api/session/getsessionForUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedData = await updatedResponse.json();

        // Split sessions into upcoming and completed
        const upcoming = updatedData.filter(
          (session: any) => session.status === 'scheduled'
        );
        const completed = updatedData.filter(
          (session: any) => session.status === 'completed'
        );

        setUpcomingSessions(upcoming);
        setCompletedSessions(completed);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const joinSession = async (_id: string) => {
    try {
      console.log("Joining session with ID:", _id);
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/session/getsession/${_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      //console.log(response.status, await response.text());
      if (!response.ok) {
        throw new Error('Failed to join session.');
      }

      const sessionData: { link: string } = await response.json(); // Assuming the response contains the session link
      window.location.href = sessionData.link; // Redirect to the session link
    } catch (error) {
      console.error('Error joining session:', error);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingSessions.length + completedSessions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Learning Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {`${Math.floor(totalLearningHours / 60)}h ${totalLearningHours % 60}m`}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {upcomingSessions.map((session) => (
              <div key={session._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{session.topic || "No Topic Provided"}</h3>
                    <p className="text-sm text-gray-500">
                      with {session.coachId?.name || "Unknown Coach"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {session.date ? format(new Date(session.date), 'PPpp') : "No Date"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.duration ? `${Math.floor(session.duration / 60)}h ${session.duration % 60}m` : "No Duration"}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => joinSession(session._id)}
                    className="btn-primary"
                    disabled={!session._id}
                  >
                    Join Session
                  </button>
                </div>
              </div>
            ))}
            {upcomingSessions.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No upcoming sessions
              </div>
            )}
          </div>
        </div>


      </div>
      <ReviewSection />
    </div>
  );
}