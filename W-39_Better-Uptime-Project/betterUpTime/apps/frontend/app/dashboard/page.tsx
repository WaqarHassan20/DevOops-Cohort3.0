"use client"
import { useState } from 'react';
import { FiHome, FiPlusCircle, FiSettings, FiBarChart2, FiHelpCircle, FiLogOut, FiSearch, FiActivity, FiEdit2, FiTrash2, FiGlobe, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    url: '',
    name: '',
    interval: '5',
    alerts: true,
    email: 'user@example.com'
  });

  const websites = [
    {
      id: 1,
      url: 'https://amazon.com',
      name: 'amazon.com',
      status: 'slow',
      lastChecked: '4 minutes ago',
      uptime: '99.1%',
      response: '856ms',
      favicon: 'https://amazon.com/favicon.ico'
    }
  ];

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding website:', newWebsite);
    setIsAddModalOpen(false);
    // Here you would typically make an API call to your backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-500';
      case 'down':
        return 'bg-red-500';
      case 'slow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <FiCheckCircle className="mr-1" />;
      case 'down':
        return <FiAlertTriangle className="mr-1" />;
      case 'slow':
        return <FiAlertTriangle className="mr-1" />;
      default:
        return null;
    }
  };

  const getUptimeColor = (uptime: string) => {
    const value = parseFloat(uptime);
    if (value >= 99) return 'text-green-400';
    if (value >= 95) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getResponseColor = (response: string) => {
    if (response.includes('ms')) {
      const value = parseInt(response);
      if (value < 200) return 'text-green-400';
      if (value < 500) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      return 'text-red-400';
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 transition-all duration-300 ease-in-out flex flex-col`}>
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
              <a href="#" className="flex items-center p-2 rounded-lg bg-gray-700">
                <FiHome className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FiPlusCircle className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Add Website</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FiSettings className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Settings</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FiBarChart2 className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Reports</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <FiHelpCircle className="text-lg" />
                {isSidebarOpen && <span className="ml-3">Help</span>}
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User" 
              className="w-8 h-8 rounded-full"
            />
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>
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
          >
            <FiPlusCircle className="mr-2" />
            Add Website
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Websites Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-8">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Checked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Uptime (24h)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg. Response</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {websites.map((site) => (
                    <tr key={site.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={site.favicon} alt={site.name} className="w-5 h-5 mr-3" />
                          <a 
                            href={site.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {site.name}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                          {getStatusIcon(site.status)}
                          {site.status === 'up' ? 'Online' : site.status === 'down' ? 'Offline' : 'Slow'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{site.lastChecked}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${getUptimeColor(site.uptime)}`}>{site.uptime}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${getResponseColor(site.response)}`}>{site.response}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-2 rounded-lg hover:bg-gray-600">
                            <FiActivity className="text-blue-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-600">
                            <FiEdit2 className="text-yellow-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-600">
                            <FiTrash2 className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 rounded-lg bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-700">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-700">3</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-700">
                  Next
                </button>
              </nav>
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
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddWebsite} className="p-4">
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({...newWebsite, url: e.target.value})}
                  placeholder="https://example.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite({...newWebsite, name: e.target.value})}
                  placeholder="My Website"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="interval" className="block text-sm font-medium text-gray-300 mb-2">
                  Check Interval
                </label>
                <select
                  id="interval"
                  value={newWebsite.interval}
                  onChange={(e) => setNewWebsite({...newWebsite, interval: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Every minute</option>
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="alerts"
                  checked={newWebsite.alerts}
                  onChange={(e) => setNewWebsite({...newWebsite, alerts: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="alerts" className="ml-2 text-sm text-gray-300">
                  Enable email alerts
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Alert Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newWebsite.email}
                  onChange={(e) => setNewWebsite({...newWebsite, email: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Add Website
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