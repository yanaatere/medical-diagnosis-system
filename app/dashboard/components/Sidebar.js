export default function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'pasien', icon: '👥', label: 'Data Pasien' },
    { id: 'penyakit', icon: '🦠', label: 'Data Penyakit' },
    { id: 'gejala', icon: '📋', label: 'Data Gejala' },
    { id: 'diagnosis', icon: '🔍', label: 'Diagnosis' },
    { id: 'report', icon: '📄', label: 'Report' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-purple-600">🏥 MediDiagnosis</h2>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition ${
              currentPage === item.id
                ? 'bg-purple-50 text-purple-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}