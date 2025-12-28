"use client";

export default function ReportDiseases({ diseases = [], symptoms = [], diagnoses = [] }) {
  const today = new Date();

  // build symptom map: disease_id => list of symptom names
  const symptomMap = new Map();
  for (const s of symptoms) {
    if (!s.diseases) continue;
    for (const d of s.diseases) {
      const key = String(d.id);
      const arr = symptomMap.get(key) || [];
      arr.push(s.name);
      symptomMap.set(key, arr);
    }
  }

  // count patients per disease from diagnoses
  const patientCount = new Map();
  for (const diag of diagnoses) {
    const key = String(diag.disease_id ?? diag.disease_id);
    if (!key) continue;
    patientCount.set(key, (patientCount.get(key) || 0) + 1);
  }

  return (
    <div className="printable-report p-6 flex justify-center">
      <style>{`
        @media print {
          @page { size: A4; margin: 18mm; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .printable-container { width: 100%; }
        }
        .printable-container {
          background: white;
          width: 800px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          padding: 28px;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }
        .report-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        .report-table th, .report-table td { border: 1px solid #111827; padding: 8px 10px; font-size: 13px; }
        .report-table thead th { background:#1E40AF; color: white; font-weight: 700; text-align: left; }
        .report-table tbody td { background: #fff; }
      `}</style>

      <div className="printable-container">
        <div style={{ borderBottom: '2px solid #000', paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/logo.png" alt="logo" style={{ width: 72, height: 72, objectFit: 'contain' }} onError={(e)=>{e.target.style.display='none'}} />
              <div>
                <div style={{ color: '#0B6CB6', fontWeight: 800, fontSize: 20 }}>KLINIK GIGI AHMAD ARIFIN</div>
                <div style={{ fontSize: 12, color: '#374151', marginTop: 6 }}>Alamat: Jl Raya Pasar Citayam RT. 01/RW. 11, </div>
                <div style={{ fontSize: 12, color: '#374151' }}>Bojong Pd. Terong, Kec. Cipayung, Depok, Jawa Barat</div>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: 12, color: '#374151' }}>
              <div>Telp : 0856-9260-8972</div>
            </div>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', marginTop: 14, fontSize: 16, fontWeight: 700 }}>LAPORAN DATA PENYAKIT</h2>

        <table className="report-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }} role="table">
          <thead>
            <tr>
              <th style={{ border: '1px solid #111827', padding: 8, background: '#1E40AF', color: '#fff', textAlign: 'left' }}>Kode</th>
              <th style={{ border: '1px solid #111827', padding: 8, background: '#1E40AF', color: '#fff', textAlign: 'left' }}>Nama Penyakit</th>
              <th style={{ border: '1px solid #111827', padding: 8, background: '#1E40AF', color: '#fff', textAlign: 'left' }}>Deskripsi</th>
              <th style={{ border: '1px solid #111827', padding: 8, background: '#1E40AF', color: '#fff', textAlign: 'left', width: 160 }}>Gejala Terkait</th>
              <th style={{ border: '1px solid #111827', padding: 8, background: '#1E40AF', color: '#fff', textAlign: 'center', width: 120 }}>Jumlah Pasien</th>
            </tr>
          </thead>
          <tbody>
            {diseases.length === 0 && (
              <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center' }}>Tidak ada data penyakit</td></tr>
            )}
            {diseases.map((d, i) => (
              <tr key={d.id || i}>
                <td style={{ border: '1px solid #111827', padding: 8 }}>{d.code}</td>
                <td style={{ border: '1px solid #111827', padding: 8 }}>{d.name}</td>
                <td style={{ border: '1px solid #111827', padding: 8 }}>{d.description || '-'}</td>
                <td style={{ border: '1px solid #111827', padding: 8 }}>{(symptomMap.get(String(d.id)) || []).join(', ') || '-'}</td>
                <td style={{ border: '1px solid #111827', padding: 8, textAlign: 'center' }}>{patientCount.get(String(d.id)) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 18, textAlign: 'right', fontSize: 13, color: '#374151' }}>
          <div>Depok, {today.toLocaleDateString()}</div>
          <div style={{ marginTop: 6 }}>Bapak Ahmad Arifin</div>
        </div>

        <div className="mt-4 no-print" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => window.print()} className="px-4 py-2 bg-purple-600 text-white rounded">Cetak</button>
        </div>

        <div className="printable-footer" aria-hidden="true"></div>
      </div>
    </div>
  );
}
