'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import PatientsPage from '../components/dashboard/PatientsPage';
import DiseasesPage from '../components/dashboard/DiseasesPage';
import SymptomsPage from '../components/dashboard/SymptomsPage';
import DiagnosisPage from '../components/dashboard/DiagnosisPage';
import ReportPage from '../components/dashboard/ReportPage';
import ReportPatients from '../components/dashboard/ReportPatients';
import ReportDiseases from '../components/dashboard/ReportDiseases';
import ReportSymptoms from '../components/dashboard/ReportSymptoms';

export default function Dashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [patients, setPatients] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetchStats();
    fetchPatients();
    fetchDiseases();
    fetchSymptoms();
    fetchDiagnoses();
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients');
      const data = await res.json();
      if (data.success) setPatients(data.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDiseases = async () => {
    try {
      const res = await fetch('/api/diseases');
      const data = await res.json();
      if (data.success) setDiseases(data.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const fetchSymptoms = async () => {
    try {
      const res = await fetch('/api/symptoms');
      const data = await res.json();
      if (data.success) setSymptoms(data.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const fetchDiagnoses = async () => {
    try {
      const res = await fetch('/api/diagnoses');
      const data = await res.json();
      if (data.success) setDiagnoses(data.data);
    } catch (error) {
      console.error('Error fetching diagnoses:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const refreshData = () => {
    fetchStats();
    if (currentPage === 'pasien') fetchPatients();
    if (currentPage === 'penyakit') fetchDiseases();
    if (currentPage === 'gejala') fetchSymptoms();
    if (currentPage === 'diagnosis') fetchDiagnoses();
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      pasien: 'Data Pasien',
      penyakit: 'Data Penyakit',
      gejala: 'Data Gejala',
      diagnosis: 'Diagnosis',
      report: 'Report'
    };
    return titles[currentPage] || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-600 to-purple-900">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <Header title={getPageTitle()} onLogout={handleLogout} />

        {currentPage === 'dashboard' && (
          <DashboardOverview stats={stats} diagnoses={diagnoses} />
        )}

        {currentPage === 'pasien' && (
          <PatientsPage patients={patients} onRefresh={refreshData} />
        )}

        {currentPage === 'penyakit' && (
          <DiseasesPage diseases={diseases} onRefresh={refreshData} />
        )}

        {currentPage === 'gejala' && (
          <SymptomsPage symptoms={symptoms} onRefresh={refreshData} />
        )}

        {currentPage === 'diagnosis' && (
          <DiagnosisPage 
            patients={patients}
            diseases={diseases}
            symptoms={symptoms}
            onSuccess={refreshData}
          />
        )}

        {currentPage === 'report' && (
          <ReportPage stats={stats} />
        )}

        {currentPage === 'report:patients' && (
          <ReportPatients patients={patients} />
        )}
        {currentPage === 'report:diseases' && (
          <ReportDiseases diseases={diseases} symptoms={symptoms} diagnoses={diagnoses} />
        )}
        {currentPage === 'report:symptoms' && (
          <ReportSymptoms symptoms={symptoms} diagnoses={diagnoses} />
        )}
      </div>
    </div>
  );
}