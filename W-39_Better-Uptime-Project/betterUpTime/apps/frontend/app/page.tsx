"use client"

import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

function App() {
  
  const router = useRouter()
    
  return (
    <div className="min-h-screen bg-gray-900">
    <header className="bg-gray-900 shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MonitorPro</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">"
            <button onClick={() => { router.push("/signin") }} className="text-gray-300 hover:text-white transition-colors hover:border-[1px] px-2 py-1 cursor-pointer hover:border-gray-200 rounded">
              Sign In
            </button>
            <button onClick={() => { router.push("/signup") }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </header>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;