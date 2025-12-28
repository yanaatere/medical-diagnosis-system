"use client";

import { useEffect, useState } from 'react';

export default function PrintableReport() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [dRes, sRes, diagRes] = await Promise.all([
          fetch('/api/diseases'),
          fetch('/api/symptoms'),
          fetch('/api/diagnoses')
        ]);

        const [dJson, sJson, diagJson] = await Promise.all([dRes.json(), sRes.json(), diagRes.json()]);

        if (!mounted) return;

        if (!dJson.success || !sJson.success || !diagJson.success) {
          setError('Salah satu endpoint mengembalikan error');
          setLoading(false);
          return;
        }

        const diseases = (dJson.data || []).map(d => ({ ...d, symptoms: [], patients: [] }));
        const diseaseMap = new Map(diseases.map(d => [String(d.id), d]));

        // Map symptoms to diseases (expecting symptoms to include `diseases` array)
        for (const s of (sJson.data || [])) {
          if (!s.diseases || !s.diseases.length) continue;
          for (const d of s.diseases) {
            const key = String(d.id);
            const target = diseaseMap.get(key);
            if (target) target.symptoms.push({ id: s.id, code: s.code || '', name: s.name });
          }
        }

        // Map patients (from diagnoses) to diseases
        for (const diag of (diagJson.data || [])) {
          const disId = diag.disease_id || (diag.disease_id === 0 ? 0 : diag.disease_id);
          const key = String(disId);
          const target = diseaseMap.get(key);
          if (!target) continue;
          // patient info may be in diag.patient_id / patient_name
          const pid = diag.patient_id || (diag.patient ? diag.patient.id : null);
          const pname = diag.patient_name || (diag.patient ? diag.patient.name : 'Unknown');
          const pExists = target.patients.find(p => String(p.id) === String(pid));
          if (!pExists) target.patients.push({ id: pid, name: pname, diagnosis_date: diag.diagnosis_date || diag.diagnosisDate || null });
        }

        setData({ diseases: Array.from(diseaseMap.values()) });
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(err.message || String(err));
        setLoading(false);
      }
    })();

    return () => { mounted = false };
  }, []);

  if (loading) return <div className="text-sm text-gray-500">Memuat laporan...</div>;
  if (error) return <div className="text-sm text-red-500">Error: {error}</div>;

  return (
    <div className="print:block hidden" id="printable-report">
      <style>{`@media print { @page { size: A4; margin: 20mm; } body { -webkit-print-color-adjust: exact; } .page-break { page-break-after: always; } }`}</style>

      <div className="w-full text-black bg-white p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Laporan Penyakit, Gejala, dan Pasien</h1>
          <div className="text-sm text-gray-700">Dicetak: {new Date().toLocaleString()}</div>
        </div>

        {data.diseases.map((d, idx) => (
          <section key={d.id || idx} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-lg font-semibold">{d.name}</h2>
                <div className="text-sm text-gray-600">Kode: {d.code}</div>
              </div>
              <div className="text-sm text-gray-700">Total Pasien: {d.patients.length}</div>
            </div>

            <div className="mb-2">
              <div className="font-semibold text-sm mb-1">Gejala Terkait</div>
              {d.symptoms.length === 0 ? (
                <div className="text-sm text-gray-500">-</div>
              ) : (
                <ol className="list-decimal list-inside text-sm">
                  {d.symptoms.map(s => (
                    <li key={s.id} className="mb-1">{s.code ? `${s.code} - ` : ''}{s.name}</li>
                  ))}
                </ol>
              )}
            </div>

            <div>
              <div className="font-semibold text-sm mb-1">Daftar Pasien</div>
              {d.patients.length === 0 ? (
                <div className="text-sm text-gray-500">-</div>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left pb-1">#</th>
                      <th className="text-left pb-1">Nama Pasien</th>
                      <th className="text-left pb-1">Tanggal Diagnosis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.patients.map((p, i) => (
                      <tr key={p.id || i}>
                        <td className="pt-1 align-top">{i + 1}</td>
                        <td className="pt-1 align-top">{p.name}</td>
                        <td className="pt-1 align-top">{p.diagnosis_date ? new Date(p.diagnosis_date).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="page-break" />
          </section>
        ))}
      </div>
    </div>
  );
}
