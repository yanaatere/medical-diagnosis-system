'use client';

import { useState } from 'react';
import CrudModal from './CrudModal';

export default function DiseasesPage({ diseases, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentData, setCurrentData] = useState({});
  const [loading, setLoading] = useState(false);

  const openModal = (mode, data = {}) => {
    setModalMode(mode);
    setCurrentData(data);
    setShowModal(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const endpoint = '/api/diseases';
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData),
      });

      if (res.ok) {
        setShowModal(false);
        setCurrentData({});
        onRefresh();
        alert('Data berhasil disimpan!');
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/diseases?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        onRefresh();
        alert('Data berhasil dihapus!');
      } else {
        alert('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Terjadi kesalahan saat menghapus data');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Kelola Data Penyakit</h3>
          <button
            onClick={() => openModal('add')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            + Tambah Penyakit
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Kode</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama Penyakit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Deskripsi</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Solusi</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {diseases.map((d, i) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-mono">{d.code}</td>
                  <td className="px-4 py-3 font-semibold">{d.name}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{d.description}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{d.solution}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', d)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CrudModal 
          modalMode={modalMode}
          modalType="diseases"
          currentData={currentData}
          setCurrentData={setCurrentData}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </>
  );
}