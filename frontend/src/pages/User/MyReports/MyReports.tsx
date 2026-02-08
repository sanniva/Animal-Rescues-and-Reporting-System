import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './MyReports.css';

interface Report {
  report_id: number;
  user_id: number;
  description: string;
  location_address: string;
  submitted_at: string;
  animal_type: string;
  animal_condition: string;
  status_id: number;
  reporter_name?: string;
  reporter_phone?: string | null;
  email?: string;
}

// Helper function to check if phone exists
const hasPhone = (phone?: string | null): boolean => {
  if (phone === null || phone === undefined) return false;
  if (typeof phone !== 'string') return false;
  return phone.trim().length > 0;
};

const ReportDetailModal: React.FC<{
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ report, isOpen, onClose }) => {
  if (!isOpen || !report) return null;

  const getStatusText = (statusId: number): string => {
    switch(statusId) {
      case 1: return 'Submitted';
      case 2: return 'Under Review';
      case 3: return 'In Progress';
      case 4: return 'Completed';
      case 5: return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const getStatusClass = (statusId: number): string => {
    switch(statusId) {
      case 1: return 'submitted';
      case 2: return 'review';
      case 3: return 'progress';
      case 4: return 'completed';
      case 5: return 'cancelled';
      default: return 'unknown';
    }
  };

  const getAnimalEmoji = (animalType: string): string => {
    const type = animalType?.toLowerCase() || '';
    if (type.includes('dog')) return '🐶';
    if (type.includes('cat')) return '🐱';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
    if (type.includes('horse')) return '🐴';
    if (type.includes('cow')) return '🐮';
    if (type.includes('goat')) return '🐐';
    if (type.includes('sheep')) return '🐑';
    if (type.includes('fish')) return '🐠';
    if (type.includes('snake')) return '🐍';
    if (type.includes('mouse') || type.includes('rat')) return '🐭';
    if (type.includes('monkey')) return '🐒';
    if (type.includes('pig')) return '🐷';
    if (type.includes('chicken')) return '🐔';
    if (type.includes('duck')) return '🦆';
    return '🐾';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConditionIcon = (condition: string): string => {
    const cond = condition.toLowerCase();
    if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
    if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
    if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
    if (cond.includes('mild') || cond.includes('sick')) return '🤒';
    if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
    if (cond.includes('healthy') || cond.includes('safe')) return '✅';
    return 'ℹ️';
  };

  const formatPhoneNumber = (phone?: string | null): string => {
    if (!hasPhone(phone)) {
      return 'Not provided';
    }
    
    const phoneStr = String(phone).trim();
    const cleaned = phoneStr.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `+977 ${cleaned}`;
    }
    
    return phoneStr;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
            <div>
              <h3 className="modal-title">Report #{report.report_id}</h3>
              <p className="modal-subtitle">{report.animal_type} • {report.animal_condition}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-top-row">
            <div className="modal-status">
              <span className={`status-badge-large status-${getStatusClass(report.status_id)}`}>
                {getStatusText(report.status_id)}
              </span>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">👤</span>
              Your Information
            </h4>
            <div className="modal-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{report.reporter_name || 'Anonymous'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">User ID</span>
                <span className="detail-value">#{report.user_id}</span>
              </div>
              {report.email && (
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{report.email}</span>
                </div>
              )}
              {hasPhone(report.reporter_phone) && (
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">
                    {formatPhoneNumber(report.reporter_phone)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">🐾</span>
              Animal Information
            </h4>
            <div className="modal-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Animal Type</span>
                <div className="detail-value-with-emoji">
                  <span className="detail-emoji">{getAnimalEmoji(report.animal_type)}</span>
                  <span>{report.animal_type || 'Unknown Animal'}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Condition</span>
                <div className="detail-value-with-emoji">
                  <span className="detail-emoji">{getConditionIcon(report.animal_condition)}</span>
                  <span>{report.animal_condition || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📍</span>
              Location Details
            </h4>
            <div className="location-card">
              <div className="location-content">
                <span className="location-icon-large">📍</span>
                <span className="location-text">{report.location_address}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📝</span>
              Description
            </h4>
            <div className="description-card">
              <p className="description-text">{report.description}</p>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="section-icon">📅</span>
              Timeline
            </h4>
            <div className="timeline-card">
              <div className="timeline-item">
                <div className="timeline-icon">📅</div>
                <div className="timeline-content">
                  <div className="timeline-label">Report Submitted</div>
                  <div className="timeline-value">{formatDate(report.submitted_at)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const MyReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUserReports = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        console.log('FETCHING reports for user ID:', currentUser.user_id);
        
        const response = await fetch('http://localhost:5000/api/reports/my-reports', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('API RESPONSE:', data);
          
          if (data.success) {
            console.log(`Found ${data.data?.length || 0} reports`);
            setReports(data.data || []);
          } else {
            console.error('API error:', data.message);
            setError(data.message || 'Failed to load reports');
          }
        } else {
          console.error('HTTP error:', response.status, response.statusText);
          setError('Failed to fetch reports: ' + response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
        setError('Error loading reports. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchUserReports();
    }
  }, [currentUser]);

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const getStatusText = (statusId: number): string => {
    switch(statusId) {
      case 1: return 'Submitted';
      case 2: return 'Under Review';
      case 3: return 'In Progress';
      case 4: return 'Completed';
      case 5: return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const getStatusClass = (statusId: number): string => {
    switch(statusId) {
      case 1: return 'submitted';
      case 2: return 'review';
      case 3: return 'progress';
      case 4: return 'completed';
      case 5: return 'cancelled';
      default: return 'unknown';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAnimalEmoji = (animalType: string): string => {
    const type = animalType?.toLowerCase() || '';
    if (type.includes('dog')) return '🐶';
    if (type.includes('cat')) return '🐱';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
    if (type.includes('horse')) return '🐴';
    if (type.includes('cow')) return '🐮';
    if (type.includes('goat')) return '🐐';
    if (type.includes('sheep')) return '🐑';
    if (type.includes('fish')) return '🐠';
    if (type.includes('snake')) return '🐍';
    if (type.includes('mouse') || type.includes('rat')) return '🐭';
    if (type.includes('monkey')) return '🐒';
    if (type.includes('pig')) return '🐷';
    if (type.includes('chicken')) return '🐔';
    if (type.includes('duck')) return '🦆';
    return '🐾';
  };

  const formatPhoneNumber = (phone?: string | null): string => {
    if (!hasPhone(phone)) {
      return 'No phone';
    }
    
    const phoneStr = String(phone).trim();
    const cleaned = phoneStr.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `+977 ${cleaned}`;
    }
    
    return phoneStr;
  };

  if (!currentUser) {
    return (
      <div className="my-reports-container">
        <div className="no-access">
          <h2>Access Denied</h2>
          <p>Please log in to view your reports.</p>
          <Link to="/login" className="login-link">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reports-container">
      <div className="reports-header">
        <div>
          <h1 className="page-title">My Reports</h1>
          <p className="page-subtitle">
            All your submitted animal rescue reports
          </p>
        </div>
        <Link to="/create-report" className="new-report-btn">
          + New Report
        </Link>
      </div>

      <div className="reports-list-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your reports...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Unable to Load Reports</h3>
            <p className="error-message">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-btn"
            >
              Try Again
            </button>
          </div>
        ) : reports.length > 0 ? (
          <div className="simple-reports-list">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Animal</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.report_id}>
                    <td className="report-id">#{report.report_id}</td>
                    <td className="animal-cell">
                      <div className="animal-info">
                        <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
                        <span className="animal-name">{report.animal_type || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="phone-cell">
                      <div className="phone-info">
                        <span className="phone-icon">📱</span>
                        <span className="phone-number">
                          {formatPhoneNumber(report.reporter_phone)}
                        </span>
                      </div>
                    </td>
                    <td className="location-cell">
                      <div className="location-info">
                        <span className="location-icon">📍</span>
                        <span className="location-text">
                          {report.location_address.length > 25 
                            ? `${report.location_address.substring(0, 25)}...` 
                            : report.location_address}
                        </span>
                      </div>
                    </td>
                    <td className="date-cell">{formatDate(report.submitted_at)}</td>
                    <td>
                      <span className={`status-badge status-${getStatusClass(report.status_id)}`}>
                        {getStatusText(report.status_id)}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleViewDetails(report)}
                        className="view-detail-btn"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No Reports Yet</h3>
            <p className="empty-message">
              You haven't submitted any reports yet.
            </p>
            <Link to="/create-report" className="empty-action-btn">
              Submit Your First Report
            </Link>
          </div>
        )}
      </div>

      <ReportDetailModal 
        report={selectedReport} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyReports;