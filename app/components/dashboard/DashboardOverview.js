export default function DashboardOverview({ stats, diagnoses }) {
  const statCards = [
    { label: 'TOTAL PASIEN', value: stats.totalPatients || 0, color: 'purple' },
    { label: 'DATA PENYAKIT', value: stats.totalDiseases || 0, color: 'blue' },
    { label: 'DATA GEJALA', value: stats.totalSymptoms || 0, color: 'green' },
    { label: 'DIAGNOSIS HARI INI', value: stats.todayDiagnoses || 0, color: 'orange' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-${card.color}-500`}>
            <h3 className="text-gray-500 text-xs sm:text-sm mb-2">{card.label}</h3>
            <p className="text-2xl sm:text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-4">Aktivitas Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Pasien</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Diagnosis</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Tanggal</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.slice(0, 5).map((d, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">{d.patient_name}</td>
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">{d.disease_name}</td>
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">{new Date(d.diagnosis_date).toLocaleDateString('id-ID')}</td>
                  <td className="px-2 sm:px-4 py-3">
                    <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}