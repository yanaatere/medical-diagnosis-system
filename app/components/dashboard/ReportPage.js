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
        <div className="flex justify-end mb-4">
          <button onClick={() => window.print()} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Cetak Laporan</button>
        </div>

        <table className="w-full">
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
      
      {/* Printable report area (hidden on-screen, shown when printing) */}
      <div className="hidden print:block">
        <div className="p-6 bg-white">
          <h2 className="text-center text-2xl font-bold mb-4">Laporan Lengkap: Penyakit - Gejala - Pasien</h2>
        </div>
      </div>
    </div>
  );
}