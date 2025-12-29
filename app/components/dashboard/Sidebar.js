'use client';

import { useState } from 'react';

export default function Sidebar({ currentPage, setCurrentPage, onMenuSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'pasien', icon: '👥', label: 'Data Pasien' },
    { id: 'penyakit', icon: '🦠', label: 'Data Penyakit' },
    { id: 'gejala', icon: '📋', label: 'Data Gejala' },
    { id: 'diagnosis', icon: '🔍', label: 'Diagnosis' },
    { id: 'report', icon: '📄', label: 'Report', children: [
      { id: 'report:patients', label: 'Data Pasien' },
      { id: 'report:diseases', label: 'Data Penyakit' },
      { id: 'report:symptoms', label: 'Data Gejala' },
      { id: 'report:diagnoses', label: 'Hasil Diagnosis' },
    ] },
  ];

  const handleMenuClick = (id) => {
    setCurrentPage(id);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
      onMenuSelect?.();
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg"
        title="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Overlay on Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 left-0 h-screen lg:h-auto w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b sticky top-0 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo.webp" alt="KLINIK GIGI Logo" className="h-12" />
            <h2 className="text-xl font-bold text-purple-600">KLINIK GIGI</h2>
          </div>
          <p className="text-sm text-gray-500">AHMAD ARIFIN</p>
        </div>
        
        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)] lg:h-auto">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  (item.children ? currentPage === item.id || currentPage?.startsWith(item.id + ':') : currentPage === item.id)
                    ? 'bg-purple-50 text-purple-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.children && <span className="text-sm text-gray-400">▾</span>}
              </button>

              {item.children && (currentPage === item.id || currentPage?.startsWith(item.id + ':')) && (
                <div className="mt-2 ml-6">
                  {item.children.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleMenuClick(c.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition text-sm ${currentPage === c.id ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}