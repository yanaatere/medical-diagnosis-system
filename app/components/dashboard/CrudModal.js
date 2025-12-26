"use client";

import React, { useEffect, useState } from 'react';

export default function CrudModal({ modalMode, modalType, currentData, setCurrentData, onSave, onClose, loading }) {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    if (modalType !== 'symptoms') return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/diseases');
        const data = await res.json();
        if (!mounted) return;
        if (data && data.success) setDiseases(data.data || []);
      } catch (err) {
        console.error('Failed to fetch diseases', err);
      }
    })();
    return () => { mounted = false };
  }, [modalType]);
  const getTitle = () => {
    const typeMap = {
      patients: 'Pasien',
      diseases: 'Penyakit',
      symptoms: 'Gejala'
    };
    return `${modalMode === 'add' ? 'Tambah' : 'Edit'} ${typeMap[modalType]}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-xl font-bold mb-4">{getTitle()}</h3>
        
        {modalType === 'patients' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Nama Pasien" 
              value={currentData.name || ''} 
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input 
              type="number" 
              placeholder="Umur" 
              value={currentData.age || ''} 
              onChange={(e) => setCurrentData({ ...currentData, age: parseInt(e.target.value) })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <select 
              value={currentData.gender || ''} 
              onChange={(e) => setCurrentData({ ...currentData, gender: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <textarea 
              placeholder="Alamat" 
              value={currentData.address || ''} 
              onChange={(e) => setCurrentData({ ...currentData, address: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
              rows="3"
            ></textarea>
            <input 
              type="text" 
              placeholder="Nomor Telepon" 
              value={currentData.phone || ''} 
              onChange={(e) => setCurrentData({ ...currentData, phone: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        )}

        {modalType === 'diseases' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Kode Penyakit (contoh: P001)" 
              value={currentData.code || ''} 
              onChange={(e) => setCurrentData({ ...currentData, code: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input 
              type="text" 
              placeholder="Nama Penyakit" 
              value={currentData.name || ''} 
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <textarea 
              placeholder="Deskripsi" 
              value={currentData.description || ''} 
              onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
              rows="3"
            ></textarea>
            <textarea 
              placeholder="Solusi" 
              value={currentData.solution || ''} 
              onChange={(e) => setCurrentData({ ...currentData, solution: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
              rows="3"
            ></textarea>
          </div>
        )}

        {modalType === 'symptoms' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Kode Gejala (contoh: G001)" 
              value={currentData.code || ''} 
              onChange={(e) => setCurrentData({ ...currentData, code: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input 
              type="text" 
              placeholder="Nama Gejala" 
              value={currentData.name || ''} 
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input 
              type="text" 
              placeholder="Kategori" 
              value={currentData.category || ''} 
              onChange={(e) => setCurrentData({ ...currentData, category: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <select
              multiple
              value={
                currentData.disease_ids 
                  ? currentData.disease_ids.map((v) => String(v)) 
                  : (currentData.diseases ? currentData.diseases.map((d) => String(d.id)) : [])
              }
              onChange={(e) => {
                const vals = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value));
                setCurrentData({ ...currentData, disease_ids: vals });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-40"
              required
            >
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>{`${d.code} - ${d.name}`}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onSave} 
            disabled={loading} 
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}