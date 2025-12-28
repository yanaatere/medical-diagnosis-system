export default function Sidebar({ currentPage, setCurrentPage }) {
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
    ] },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-purple-600">🏥 MediDiagnosis</h2>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-2">
            <button
              onClick={() => item.children ? setCurrentPage(item.id) : setCurrentPage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                (item.children ? currentPage === item.id || currentPage?.startsWith(item.id + ':') : currentPage === item.id)
                  ? 'bg-purple-50 text-purple-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.children && <span className="text-sm text-gray-400">▾</span>}
            </button>

            {item.children && (currentPage === item.id || currentPage?.startsWith(item.id + ':')) && (
              <div className="mt-2 ml-6">
                {item.children.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrentPage(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition ${currentPage === c.id ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
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
  );
}