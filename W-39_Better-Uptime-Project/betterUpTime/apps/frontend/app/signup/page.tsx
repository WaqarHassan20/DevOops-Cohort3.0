"use client"
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';

export default function Signup() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {

      await axios.post(`${BACKEND_URL}/user/signup`,{
        username: username,
        password: password
      })

      router.push('/signin'); // Redirect after signup

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <Head>
        <title>Sign Up | Your App</title>
      </Head>
      
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}