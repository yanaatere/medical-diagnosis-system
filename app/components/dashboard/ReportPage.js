export default function ReportPage({ stats }) {
  const statCards = [
    { label: 'TOTAL PASIEN', value: stats.totalPatients || 0 },
    { label: 'TOTAL PENYAKIT', value: stats.totalDiseases || 0 },
    { label: 'TOTAL GEJALA', value: stats.totalSymptoms || 0 },
    { label: 'TOTAL DIAGNOSIS', value: stats.totalDiagnoses || 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm text-gray-500 mb-2">{card.label}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Penyakit Paling Sering Didiagnosis</h3>
        <table className="w-full">x
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Penyakit</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Kode</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Jumlah Kasus</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {stats.topDiseases?.map((d, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{d.name}</td>
                <td className="px-4 py-3 font-mono">{d.code}</td>
                <td className="px-4 py-3">{d.count}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {d.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}