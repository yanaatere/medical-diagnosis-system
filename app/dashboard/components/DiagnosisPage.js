'use client';

import { useState } from 'react';

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
    
    if (!formData.patient_id || !formData.disease_id) {
      alert('Pasien dan Penyakit harus dipilih!');
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

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Pilih Penyakit *</label>
          <select 
            value={formData.disease_id} 
            onChange={(e) => setFormData({ ...formData, disease_id: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          >
            <option value="">-- Pilih Penyakit --</option>
            {diseases.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
            ))}
          </select>
        </div>

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