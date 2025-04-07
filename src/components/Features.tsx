import React from 'react';
import { Star, Users, Calendar, Award } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Expert Coaches',
    description: 'Learn from industry professionals with years of experience'
  },
  {
    icon: Users,
    title: '1-on-1 Sessions',
    description: 'Get personalized attention and guidance'
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Book sessions that fit your calendar'
  },
  {
    icon: Award,
    title: 'Skill Certification',
    description: 'Earn certificates as you progress'
  }
];

export default function Features() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide the tools and expertise you need to master the IT Skills
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-50 p-3">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}