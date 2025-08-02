"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { FiPlus, FiTrash2, FiExternalLink, FiLogOut, FiActivity, FiMonitor, FiShield } from 'react-icons/fi';

interface Website {
  id: string;
  url: string;
  timeAdded: string;
  ticks: Array<{
    status: 'Up' | 'Down' | 'Unknown';
    response_time_ms: number;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Get auth headers
  const getHeaders = () => ({
    headers: { Authorization: localStorage.getItem("token") }
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchWebsites();
  }, [router]);

  // Fetch websites
  const fetchWebsites = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/websites`, getHeaders());
      setWebsites(response.data.websites);
      setError('');
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'response' in err && (err as any).response?.status === 401) {
        localStorage.removeItem("token");
        router.push('/signin');
      } else {
        setError('Failed to fetch websites');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add website
  const addWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/website`, { url: newUrl }, getHeaders());
      setNewUrl('');
      await fetchWebsites();
    } catch (err) {
      setError('Failed to add website');
    } finally {
      setLoading(false);
    }
  };

  // Delete website
  const deleteWebsite = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/websites/${id}`, getHeaders());
      await fetchWebsites();
    } catch (err) {
      setError('Failed to delete website');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    router.push('/signin');
  };

  // Get website status
  const getStatus = (site: Website) => {
    if (!site.ticks?.length) return { status: 'Unknown', time: '--', color: 'bg-gray-500' };
    const latest = site.ticks[0];
    const colors = {
      Up: 'bg-green-500',
      Down: 'bg-red-500',
      Unknown: 'bg-gray-500'
    };
    return {
      status: latest.status,
      time: `${latest.response_time_ms}ms`,
      color: colors[latest.status]
    };
  };

  // Get display name from URL
  const getDisplayName = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  if (loading && websites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <FiActivity className="animate-spin mx-auto mb-4 text-4xl" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          {/* Logo and Title */}
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FiShield className="text-white text-2xl" />
            </div>
            {/* Pulse animation for online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-gray-900"></div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              UpTime Monitor
            </h1>
            <p className="text-gray-400 text-sm">Keep your websites online 24/7</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-lg hover:shadow-red-500/25"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* Add Website Form */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Website</h2>
        <form onSubmit={addWebsite} className="flex gap-4">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
          >
            <FiPlus />
            Add Website
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
          <button onClick={() => setError('')} className="float-right">×</button>
        </div>
      )}

      {/* Websites List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Monitored Websites ({websites.length})</h2>
        </div>

        {websites.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <FiActivity className="mx-auto mb-4 text-4xl" />
            <p>No websites added yet. Add your first website above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Website</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Response Time</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Last Check</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {websites.map((site) => {
                  const status = getStatus(site);
                  const displayName = getDisplayName(site.url);
                  const favicon = `https://www.google.com/s2/favicons?domain=${site.url}`;
                  
                  return (
                    <tr key={site.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={favicon} 
                            alt="" 
                            className="w-5 h-5"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                          />
                          <div>
                            <div className="font-medium">{displayName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${status.color}`}>
                          {status.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {status.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {site.ticks?.[0]?.createdAt ? 
                          new Date(site.ticks[0].createdAt).toLocaleString() : 
                          'Never'
                        }
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.open(site.url, '_blank')}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded"
                            title="Visit website"
                          >
                            <FiExternalLink />
                          </button>
                          <button
                            onClick={() => deleteWebsite(site.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded"
                            title="Delete website"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Auto-refresh indicator */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        {loading && <span>Refreshing data...</span>}
      </div>
    </div>
  );
}