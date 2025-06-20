import React from "react";
import { useQuery } from "react-query";
import { getStatistik } from "../../../api/admin";
import Loading from "../../../components/loading";
import "./Dashboard.css"; // File CSS terpisah

export default function Dashboard() {
  const { isLoading, data } = useQuery(
    "/kuota/statistik",
    () => getStatistik(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 10,
    }
  );

 

  // Data kuota maksimal
  const kuotaMaksimal = {
    afirmasi: 54,
    prestasi: 54,
    reguler: 252,
    total: 360
  };

  // Hitung persentase terisi
  const calculatePercentage = (current, max) => {
    return Math.min(100, Math.round((current / max) * 100));
  };

  const StatCard = ({ title, value, max, color }) => {
    const percentage = calculatePercentage(value, max);
    
     if (isLoading) return <Loading />;
    return (
      <div className="stat-card">
        <div className="card-header" style={{ borderBottom: `3px solid ${color}` }}>
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <div className="stat-value">
            {value}
            <span className="stat-max"> / {max}</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: color
              }}
            ></div>
          </div>
        </div>
        <div className="card-footer">
          <span className={`status-badge ${value >= max ? 'status-full' : 'status-available'}`}>
            {value >= max ? 'Kuota Terpenuhi' : 'Masih Tersedia'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header text-blue-400">
        <h1 className="text-blue-400 font-bold">DAFTAR SISWA LULUS PPDB</h1>
        <h2 className="text-blue-400 font-bold">MAN 1 KOTA SUKABUMI TAHUN 2024/2025</h2>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="JALUR AFIRMASI" 
          value={data?.data?.afirmasi || 0} 
          max={54} 
          color="#E53E3E" 
        />
        
        <StatCard 
          title="JALUR REGULER" 
          value={data?.data?.reguler || 0} 
          max={252} 
          color="#3182CE" 
        />
        
        <StatCard 
          title="JALUR PRESTASI" 
          value={data?.data?.prestasi || 0} 
          max={54} 
          color="#38A169" 
        />
      </div>

      <div className="total-card">
        <div className="card-header">
          <h3>TOTAL PESERTA DIDIK</h3>
        </div>
        <div className="card-body">
          <div className="total-value">
            {data?.data?.total || 0}
            <span className="total-max"> / {kuotaMaksimal.total}</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${calculatePercentage(data?.data?.total || 0, kuotaMaksimal.total)}%`,
                backgroundColor: '#805AD5'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}