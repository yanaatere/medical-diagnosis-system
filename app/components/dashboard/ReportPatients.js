"use client";

export default function ReportPatients({ patients }) {
  const today = new Date();

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
        .report-header .title { color: #0B6CB6; font-weight: 800; font-size: 20px; }
        .report-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        .report-table th, .report-table td { border: 1px solid #111827; padding: 8px 10px; font-size: 13px; }
        .report-table thead th { background:#1E40AF; color: white; font-weight: 700; text-align: left; }
        .report-table tbody td { background: #fff; }
        .report-footer { margin-top: 18px; text-align: right; font-size: 13px; color: #374151; }
      `}</style>

      <div className="printable-container">
        <div className="report-header" style={{ borderBottom: '2px solid #000', paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/logo.png" alt="logo" style={{ width: 72, height: 72, objectFit: 'contain' }} onError={(e)=>{e.target.style.display='none'}} />
              <div>
                <div className="title">SMARTPREG</div>
                <div style={{ fontSize: 12, color: '#374151', marginTop: 4 }}>Smart Sistem Untuk Layanan Kehamilan</div>
                <div style={{ fontSize: 12, color: '#374151', marginTop: 6 }}>Alamat: Jl. H. Nadi No.28, RT.007/RW.001, Kec. Cihere</div>
                <div style={{ fontSize: 12, color: '#374151' }}>Kel. Cinere, Kota. Depok, Jawa Barat.</div>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: 12, color: '#374151' }}>
              <div>Telp. 089656328112</div>
            </div>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', marginTop: 14, fontSize: 16, fontWeight: 700 }}>LAPORAN DATA PASIEN</h2>

        <table className="report-table" role="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID Pasien</th>
              <th>Nama Pasien</th>
              <th style={{ width: 80 }}>Umur Pasien</th>
              <th style={{ width: 150 }}>No.Telepon</th>
              <th>Alamat Pasien</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>Tidak ada data pasien</td>
              </tr>
            )}
            {patients.map((p, i) => (
              <tr key={p.id || i}>
                <td style={{ textAlign: 'center' }}>{i + 1}</td>
                <td>{p.name}</td>
                <td style={{ textAlign: 'center' }}>{p.age ?? '-'}</td>
                <td style={{ textAlign: 'center' }}>{p.phone || '-'}</td>
                <td>{p.address || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="report-footer">
          <div>Depok, {today.toLocaleDateString()}</div>
          <div style={{ marginTop: 6 }}>Admin MediDiagnosis</div>
        </div>

        <div className="mt-4 no-print" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => window.print()} className="px-4 py-2 bg-purple-600 text-white rounded">Cetak</button>
        </div>

        {/* print footer (page numbers) - visible only during print */}
        <div className="printable-footer" aria-hidden="true"></div>
      </div>
    </div>
  );
}
