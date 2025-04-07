import React from 'react';
import Hero from '../components/Hero';
import CoachList from '../components/CoachList';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <CoachList />
      <Testimonials />
      
    </div>
  );
}