'use client';

import { useState, useMemo } from 'react';

export default function DiagnosisPage({ patients, diseases, symptoms, onSuccess }) {
  const [formData, setFormData] = useState({
    patient_id: '',
    disease_id: '',
    symptom_ids: [],
    notes: '',
    status: 'Selesai'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patient_id) {
      alert('Pasien harus dipilih!');
      return;
    }

    if (!formData.disease_id) {
      alert('Pilih penyakit dari saran berdasarkan gejala yang dipilih.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/diagnoses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Diagnosis berhasil disimpan!');
        setFormData({ 
          patient_id: '', 
          disease_id: '', 
          symptom_ids: [], 
          notes: '', 
          status: 'Selesai' 
        });
        onSuccess();
      } else {
        alert('Gagal menyimpan diagnosis');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan diagnosis');
    }
    setLoading(false);
  };

  const toggleSymptom = (id) => {
    setFormData(prev => ({
      ...prev,
      symptom_ids: prev.symptom_ids.includes(id)
        ? prev.symptom_ids.filter(s => s !== id)
        : [...prev.symptom_ids, id]
    }));
  };

  const suggestions = useMemo(() => {
    const selected = formData.symptom_ids || [];
    if (!selected.length) return [];

    const map = new Map();
    for (const sid of selected) {
      const symptom = symptoms.find(s => s.id === sid) || symptoms.find(s => String(s.id) === String(sid));
      if (!symptom || !symptom.diseases) continue;
      for (const d of symptom.diseases) {
        const key = d.id;
        const cur = map.get(key) || { ...d, matchCount: 0 };
        cur.matchCount += 1;
        map.set(key, cur);
      }
    }

    const arr = Array.from(map.values()).map((d) => ({
      ...d,
      matchCount: d.matchCount,
      matchPercent: Math.round((d.matchCount / selected.length) * 100)
    }));

    arr.sort((a, b) => b.matchCount - a.matchCount || a.code.localeCompare(b.code));
    return arr;
  }, [formData.symptom_ids, symptoms]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-6">Form Diagnosis Pasien</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Pilih Pasien *</label>
          <select 
            value={formData.patient_id} 
            onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          >
            <option value="">-- Pilih Pasien --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.age} tahun</option>
            ))}
          </select>
        </div>

        {/* Penyakit dipilih otomatis lewat saran berdasarkan gejala; input dropdown dihapus */}

        <div>
          <label className="block mb-3 font-semibold text-gray-700">Pilih Gejala yang Dialami</label>
          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {symptoms.map(s => (
              <label key={s.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input 
                  type="checkbox" 
                  checked={formData.symptom_ids.includes(s.id)} 
                  onChange={() => toggleSymptom(s.id)} 
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 rounded"
                />
                <span className="text-sm">{s.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Saran Penyakit Berdasarkan Gejala</label>
          <div className="space-y-2">
            {suggestions.length === 0 ? (
              <div className="text-sm text-gray-500">Pilih gejala untuk melihat saran penyakit.</div>
            ) : (
              suggestions.map(d => (
                <div key={d.id} className={`flex items-center justify-between p-2 border rounded ${String(formData.disease_id) === String(d.id) ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                  <div>
                    <div className="font-semibold">{d.name} <span className="text-xs text-gray-500">({d.code})</span></div>
                    <div className="text-xs text-gray-500">Kecocokan: {d.matchCount} gejala ({d.matchPercent}%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {String(formData.disease_id) === String(d.id) ? (
                      <button type="button" onClick={() => setFormData({ ...formData, disease_id: '' })} className="px-3 py-1 bg-gray-200 rounded">Batal</button>
                    ) : (
                      <button type="button" onClick={() => setFormData({ ...formData, disease_id: d.id })} className="px-3 py-1 bg-purple-600 text-white rounded">Pilih</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Catatan Tambahan</label>
          <textarea 
            value={formData.notes} 
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            rows="4" 
            placeholder="Masukkan catatan tambahan jika ada..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loading ? 'Memproses...' : '🔍 Proses Diagnosis'}
        </button>
      </form>
    </div>
  );
}