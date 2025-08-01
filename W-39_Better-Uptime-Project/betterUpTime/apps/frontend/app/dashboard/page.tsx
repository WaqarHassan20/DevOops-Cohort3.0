"use client"
import { BACKEND_URL } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiHome, FiPlusCircle, FiSettings, FiSearch, FiActivity, FiCheckCircle, FiAlertTriangle, FiTrash } from 'react-icons/fi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');

  interface Tick {
    status?: string;
    response_time_ms?: number;
    [key: string]: any;
  }

  interface Website {
    id: string;
    url: string;
    name?: string;
    status?: string;
    response?: string;
    ticks?: Tick[];
    timeAdded?: string;
    lastChecked?: string;
  }

  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch websites initially and set up polling
  useEffect(() => {
  
    const fetchWebsites = async () => {
  try {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${BACKEND_URL}/websites`, {
        headers: {
          Authorization: token
        }
      });
      setWebsites(response.data.websites.map((w: any) => ({
        id: w.id,
        url: w.url,
        timeAdded: w.timeAdded,
        ticks: w.ticks,
        lastChecked: w.lastChecked
        // status: w.ticks[0] ? (w.ticks[0].status == "Up" ? "up" : "down") : "checking",
        // responseTime: w.ticks[0] ? w.ticks[0].response_time_ms : 0

      })));
      
      setError('');
    }
  } catch (err) {
    setError('Failed to fetch websites');
    console.error('Error fetching websites:', err);
  } finally {
    setIsLoading(false);
  }
};

    fetchWebsites(); // Initial fetch
    const interval = setInterval(fetchWebsites, 60000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/website`,
        { url: websiteUrl },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      
      // Clear form and close modal first
      setWebsiteUrl('');
      setIsAddModalOpen(false);
      setError(''); // Clear any previous errors
      
      // Refresh websites list immediately to show the new website
      try {
        const fetchResponse = await axios.get(`${BACKEND_URL}/websites`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setWebsites(fetchResponse.data.websites);
      } catch (fetchErr) {
        console.error('Error refreshing websites:', fetchErr);
        // Fallback: add the new website from response if refresh fails
        if (response.data.website) {
          setWebsites(prev => [...prev, response.data.website]);
        }
      }
      
    } catch (err) {
      setError('Failed to add website');
      console.error('Error adding website:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWebsite = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BACKEND_URL}/websites/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setWebsites(websites.filter(website => website.id !== id));
    } catch (err) {
      setError('Failed to delete website');
      console.error('Error deleting website:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'bg-green-500';
      case 'down': return 'bg-red-500';
      case 'slow': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up': return <FiCheckCircle className="mr-1" />;
      case 'down': return <FiAlertTriangle className="mr-1" />;
      case 'slow': return <FiAlertTriangle className="mr-1" />;
      default: return null;
    }
  };

  const getResponseColor = (response: string) => {
    if (!response) return 'text-gray-400';
    if (response.includes('ms')) {
      const value = parseInt(response);
      if (value < 200) return 'text-green-400';
      if (value < 500) return 'text-yellow-400';
      return 'text-red-400';
    }
    return 'text-red-400';
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-center border-b border-gray-700">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold">SiteMonitor</h1>
          ) : (
            <span className="text-2xl">🔍</span>
          )}
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button className="flex items-center w-full p-2 rounded-lg bg-gray-700">
                <FiHome className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <FiPlusCircle className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Add Website</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                <FiSettings className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            ☰
          </button>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            disabled={isLoading}
          >
            <FiPlusCircle className="mr-2" />
            Add Website
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-lg font-semibold">Tracked Websites</h3>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search websites..." 
                  className="bg-gray-700 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Website</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Response Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Checked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                {isLoading && websites.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                      Loading websites...
                    </td>
                  </tr>
                ) : websites.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                      No websites added yet
                    </td>
                  </tr>
                ) : (
                  websites.map((site) => {
                    let displayName: string;
                    let faviconUrl: string;
                    try {
                      displayName = site.name || new URL(site.url).hostname.replace('www.', '');
                    } catch (e) {
                      displayName = site.url;
                    }
                    faviconUrl = `https://www.google.com/s2/favicons?domain=${site.url}`;
                    
                    const latestTick = site.ticks?.[0];
                    
                    return (
                      <tr key={site.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={faviconUrl}
                              alt={displayName}
                              className="w-5 h-5 mr-3" 
                              onError={(e) => {
                                e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${site.url}`;
                              }}
                            />
                            <a 
                              href={site.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {displayName}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status ?? '')}`}>
                            {/* {getStatusIcon(site.status ?? '')} */}
                            {/* {site.status === 'Up' ? 'Online' : site.status === 'Down' ? 'Offline' : site.status || 'Unknown'} */}
                            {getStatusIcon(latestTick?.status ?? 'Unknown')}
                            {latestTick?.status === 'Up' ? 'Online' : latestTick?.status === 'Down' ? 'Offline' : 'Unknown'}
                          </span>
                        </td>
                        
                        <td className={`px-6 py-4 whitespace-nowrap ${getResponseColor((latestTick?.response_time_ms ?? 0).toString() + 'ms')}`}>
                        {latestTick?.response_time_ms ? `${latestTick.response_time_ms}ms` : '--'}
                        </td>

                        <td className={`px-6 py-4 whitespace-nowrap ${getResponseColor(site.response ?? '')}`}>
                          {site.response || '--'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button 
                              className="p-2 rounded-lg hover:bg-gray-600"
                              onClick={() => window.open(site.url, '_blank')}
                            >
                              <FiActivity className="text-blue-400" />
                            </button>
                            <button 
                              className="p-2 rounded-lg hover:bg-gray-600"
                              onClick={() => handleDeleteWebsite(site.id)}
                            >
                              <FiTrash className="text-blue-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Website Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-md">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add New Website</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddWebsite} className="p-4">
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL *
                </label>
                <input
                  type="url"
                  id="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;