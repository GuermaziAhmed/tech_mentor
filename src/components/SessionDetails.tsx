import React from 'react';
import { Clock } from 'lucide-react';

interface SessionDetailsProps {
  topic: string;
  duration: number;
  onTopicChange: (topic: string) => void;
  onDurationChange: (duration: number) => void;
}

const durations = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 120, label: '2 hours' }
];

export default function SessionDetails({
  topic,
  duration,
  onTopicChange,
  onDurationChange
}: SessionDetailsProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h2>
      
      {/* Topic Input */}
      <div className="mb-6">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
          What would you like to discuss?
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., React Hooks, MongoDB Schema Design, Express Middleware"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Duration Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Duration
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {durations.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDurationChange(value)}
              className={`flex items-center justify-center p-3 border rounded-lg ${
                duration === value 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Clock className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}