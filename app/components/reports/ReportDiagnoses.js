"use client"

import React, { useEffect, useState } from "react"

export default function ReportDiagnoses() {
  const [allDiagnoses, setAllDiagnoses] = useState([])
  const [patients, setPatients] = useState([])
  const [patientsMap, setPatientsMap] = useState({})
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [dRes, pRes] = await Promise.all([
          fetch('/api/diagnoses').then(r => r.json()),
          fetch('/api/patients').then(r => r.json()),
        ])
        
        const pMap = {}
        const patientsList = pRes?.data || pRes || []
        patientsList.forEach(p => { pMap[p.id] = p })
        setPatientsMap(pMap)
        setPatients(patientsList)
        
        const diagnosesList = dRes?.data || dRes || []
        setAllDiagnoses(diagnosesList)
      } catch (err) {
        setError(err.message)
        console.error('Error loading diagnoses:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Filter diagnoses when patient or date changes
  useEffect(() => {
    let filtered = allDiagnoses
    
    if (selectedPatientId) {
      filtered = filtered.filter(d => d.patient_id === parseInt(selectedPatientId))
    }
    
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate)
      filtered = filtered.filter(d => {
        const diagDate = new Date(d.diagnosis_date || d.created_at)
        return diagDate.toLocaleDateString() === selectedDateObj.toLocaleDateString()
      })
    }
    
    setFilteredDiagnoses(filtered)
  }, [selectedPatientId, selectedDate, allDiagnoses])

  function printPage() {
    window.print()
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="p-6">
      {/* Search/Filter Section (hidden on print) */}
      <div className="no-print mb-6 bg-white p-4 border rounded">
        <h2 className="text-lg font-bold mb-4">Filter Laporan Diagnosis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Pilih Pasien</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">-- Semua Pasien --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Pilih Tanggal</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            onClick={printPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print
          </button>
          <button
            onClick={() => {
              setSelectedPatientId('')
              const today = new Date()
              setSelectedDate(today.toISOString().split('T')[0])
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Printable Report Section */}
      <div className="printable-container p-8 bg-white" style={{ fontSize: '12px', lineHeight: '1.4' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img src="/logo.png" alt="logo" style={{ height: '60px' }} />
          </div>
          <h1 style={{ fontWeight: 'bold', fontSize: '14px', margin: '4px 0' }}>LAPORAN REKAM MEDIS PASIEN</h1>
        </div>

        {/* Report Content */}
        {filteredDiagnoses.length === 0 ? (
          <div className="text-center text-gray-500">Tidak ada data diagnosis</div>
        ) : (
          filteredDiagnoses.map((d, idx) => {
            const patient = patientsMap[d.patient_id] || { 
              name: d.patient_name,
              age: '-',
              phone: '-',
              address: '-',
              id: d.patient_id
            }
            const diagDate = new Date(d.diagnosis_date || d.created_at || Date.now())
            
            return (
              <div key={d.id || idx} style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                {/* Patient Info Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#2563eb', color: 'white' }}>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>ID Pasien</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>Tanggal</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>Nama Pasien</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>Umur</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>No Telepon</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 'bold' }}>Alamat Pasien</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '6px 8px' }}>{patient.id}</td>
                      <td style={{ padding: '6px 8px' }}>{diagDate.toLocaleDateString('id-ID')}</td>
                      <td style={{ padding: '6px 8px' }}>{patient.name}</td>
                      <td style={{ padding: '6px 8px' }}>{patient.age || '-'}</td>
                      <td style={{ padding: '6px 8px' }}>{patient.phone || '-'}</td>
                      <td style={{ padding: '6px 8px' }}>{patient.address || '-'}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Diagnosis Section */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 8px', fontWeight: 'bold', marginBottom: '6px' }}>
                    Pasien Terdidagasi Mengalami Penyakit :
                  </div>

                  {/* Disease Code Header */}
                  {d.disease_code && (
                    <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 8px', fontWeight: 'bold', marginBottom: '6px' }}>
                      {d.disease_code}
                    </div>
                  )}

                  {/* Disease Name Header */}
                  <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 8px', fontWeight: 'bold', marginBottom: '6px' }}>
                    {d.disease_name || '-'}
                  </div>

                  {/* Symptoms */}
                  {(d.symptoms && d.symptoms.length > 0) && (
                    <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f3f4f6', border: '1px solid #ddd' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Gejala yang ditemukan:</div>
                      <ul style={{ marginLeft: '20px', margin: '0' }}>
                        {d.symptoms.map((s, i) => (
                          <li key={i} style={{ marginBottom: '3px' }}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 8px', fontWeight: 'bold', marginBottom: '6px' }}>
                    Rekomendasi / Penatalaksanaan
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f9fafb', border: '1px solid #ddd', minHeight: '60px' }}>
                    {d.notes || '-'}
                  </div>
                </div>

                {/* Status */}
                {d.status && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
                    <strong>Status:</strong> {d.status}
                  </div>
                )}
              </div>
            )
          })
        )}

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'right', fontSize: '11px', borderTop: '1px solid #ddd', paddingTop: '12px' }}>
          <div>Jakarta, {new Date().toLocaleDateString('id-ID')}</div>
          <div style={{ marginTop: '20px' }}>_______________________</div>
          <div style={{ marginTop: '4px' }}>Bapak Ahmad Arifin</div>
        </div>

        {/* Print Footer with Page Numbers */}
        <div className="printable-footer text-center text-sm" style={{ fontSize: '11px', marginTop: '12px' }}>
          {/* page numbers are injected via CSS counters during print */}
        </div>
      </div>
    </div>
  )
}
