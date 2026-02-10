import React, { useEffect, useState, useCallback } from 'react';
import './RescueReports.css';

interface RescueReport {
  report_id: number;
  user_id: number;
  username: string;
  email: string;
  phone: string;
  description: string;
  location_address: string;
  user_note?: string;
  admin_note?: string;
  submitted_at: string;
  updated_at?: string;
  animal_type: string;
  animal_condition: string;
  status_id: number;
  volunteer_name?: string;
  volunteer_id?: number;
  volunteer_email?: string;
  volunteer_phone?: string;
}

interface Volunteer {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  bio?: string;
  joined_at: string;
  approval_status: string;
  approval_status_id: number;
  availability_status: string;
  availability_status_id: number;
  assigned_reports_count: number;
  role_id: number;
  created_at: string;
}

// Volunteer Selection Modal Component
const VolunteerSelectModal: React.FC<{
  report: RescueReport | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (volunteer: Volunteer) => void;
  volunteers: Volunteer[];
  loadingVolunteers: boolean;
  statusConfig: any[];
  getStatusName: (id: number) => string;
  getAnimalEmoji: (type: string) => string;
  formatVolunteerDate: (date: string) => string;
}> = ({ 
  report, 
  isOpen, 
  onClose, 
  onSelect, 
  volunteers, 
  loadingVolunteers, 
  statusConfig, 
  getStatusName, 
  getAnimalEmoji,
  formatVolunteerDate 
}) => {
  if (!isOpen || !report) return null;

  const availableVolunteers = volunteers.filter(v => 
    v.availability_status_id === 1 || v.availability_status === 'Available'
  );
  const busyVolunteers = volunteers.filter(v => 
    v.availability_status_id === 2 || v.availability_status === 'Busy'
  );
  const unavailableVolunteers = volunteers.filter(v => 
    v.availability_status_id === 3 || v.availability_status === 'Unavailable'
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Assign Volunteer</h3>
            <p className="modal-subtitle">Report #{report.report_id}</p>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-summary">
            <div className="summary-item">
              <span className="summary-label">Current Status</span>
              <span className={`status-indicator status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
                {getStatusName(report.status_id)}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Animal</span>
              <span className="summary-value">
                {getAnimalEmoji(report.animal_type)} {report.animal_type}
              </span>
            </div>
          </div>

          <div className="volunteers-container">
            <h4>Available Volunteers ({volunteers.length})</h4>
            
            {loadingVolunteers ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading volunteers...</p>
              </div>
            ) : volunteers.length === 0 ? (
              <div className="empty-state">
                <p>No approved volunteers available.</p>
              </div>
            ) : (
              <div className="volunteers-grid">
                {/* Available Volunteers */}
                {availableVolunteers.length > 0 && (
                  <div className="volunteer-category">
                    <div className="category-header">
                      <span className="status-dot available"></span>
                      <span>Available ({availableVolunteers.length})</span>
                    </div>
                    {availableVolunteers.map(volunteer => (
                      <div key={volunteer.user_id} className="volunteer-item">
                        <div className="volunteer-info">
                          <div className="volunteer-avatar">
                            {volunteer.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="volunteer-details">
                            <h5>{volunteer.username}</h5>
                            <div className="volunteer-meta">
                              <span className="meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {volunteer.assigned_reports_count} reports
                              </span>
                              <span className="meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                Joined {formatVolunteerDate(volunteer.joined_at)}
                              </span>
                            </div>
                            {volunteer.email && (
                              <div className="volunteer-contact">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                {volunteer.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          className="btn primary"
                          onClick={() => onSelect(volunteer)}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Busy Volunteers */}
                {busyVolunteers.length > 0 && (
                  <div className="volunteer-category">
                    <div className="category-header">
                      <span className="status-dot busy"></span>
                      <span>Busy ({busyVolunteers.length})</span>
                    </div>
                    {busyVolunteers.map(volunteer => (
                      <div key={volunteer.user_id} className="volunteer-item">
                        <div className="volunteer-info">
                          <div className="volunteer-avatar">
                            {volunteer.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="volunteer-details">
                            <h5>{volunteer.username}</h5>
                            <div className="volunteer-meta">
                              <span className="meta-item warning">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                {volunteer.assigned_reports_count} active reports
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn secondary"
                          onClick={() => onSelect(volunteer)}
                        >
                          Assign Anyway
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Unavailable Volunteers */}
                {unavailableVolunteers.length > 0 && (
                  <div className="volunteer-category">
                    <div className="category-header">
                      <span className="status-dot unavailable"></span>
                      <span>Unavailable ({unavailableVolunteers.length})</span>
                    </div>
                    {unavailableVolunteers.map(volunteer => (
                      <div key={volunteer.user_id} className="volunteer-item disabled">
                        <div className="volunteer-info">
                          <div className="volunteer-avatar">
                            {volunteer.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="volunteer-details">
                            <h5>{volunteer.username}</h5>
                            <div className="volunteer-meta">
                              <span className="meta-item">
                                Currently unavailable
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="btn" disabled>
                          Unavailable
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Report Detail Modal Component
const ReportDetailModal: React.FC<{
  report: RescueReport | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignClick: () => void;
  onUnassign: (reportId: number) => void;
  getToken: () => string | null;
  getAnimalEmoji: (type: string) => string;
  formatDate: (date: string) => string;
  statusConfig: any[];
  getStatusName: (id: number) => string;
  showMessage: (text: string, type: 'success' | 'error') => void;
}> = ({ 
  report, 
  isOpen, 
  onClose, 
  onAssignClick, 
  onUnassign, 
  getToken, 
  getAnimalEmoji, 
  formatDate, 
  statusConfig,
  getStatusName,
  showMessage
}) => {
  const [localAdminNote, setLocalAdminNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (report) {
      setLocalAdminNote(report.admin_note || '');
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const currentStatus = statusConfig.find(s => s.id === report.status_id);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!localAdminNote.trim()) {
      showMessage('Please enter a note', 'error');
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      setSavingNote(true);
      
      const response = await fetch(`http://localhost:5000/api/reports/${report.report_id}/admin-note`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: localAdminNote })
      });
      
      if (response.ok) {
        const data = await response.json();
        showMessage('Note saved successfully!', 'success');
        report.admin_note = data.admin_note;
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to save note', 'error');
      }
    } catch (error: any) {
      console.error('Error saving note:', error);
      showMessage(error.message || 'Error saving note. Please try again.', 'error');
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Rescue Report #{report.report_id}</h3>
            <div className="modal-subheader">
              <span className={`status-badge status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
                {getStatusName(report.status_id)}
              </span>
              <span className="report-meta">{formatDate(report.submitted_at)}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-column">
              <div className="info-card">
                <div className="card-header">
                  <h4>Animal Information</h4>
                </div>
                <div className="card-content">
                  <div className="animal-display">
                    <div className="animal-icon">
                      {getAnimalEmoji(report.animal_type)}
                    </div>
                    <div>
                      <div className="animal-type">{report.animal_type}</div>
                      <div className="animal-condition">{report.animal_condition}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h4>Reporter Details</h4>
                </div>
                <div className="card-content">
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">Name</span>
                      <span className="detail-value">{report.username}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{report.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{report.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h4>Location</h4>
                </div>
                <div className="card-content">
                  <div className="location-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{report.location_address}</span>
                  </div>
                  <button 
                    className="btn outline small"
                    onClick={() => {
                      const encodedAddress = encodeURIComponent(report.location_address);
                      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
                    }}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-column">
              <div className="info-card">
                <div className="card-header">
                  <div className="header-row">
                    <h4>Volunteer Assignment</h4>
                    {!report.volunteer_name && (
                      <button 
                        className="btn primary small"
                        onClick={onAssignClick}
                      >
                        Assign Volunteer
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-content">
                  {report.volunteer_name ? (
                    <div className="volunteer-assigned">
                      <div className="volunteer-display">
                        <div className="volunteer-avatar">
                          {report.volunteer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="volunteer-info">
                          <h5>{report.volunteer_name}</h5>
                          <div className="volunteer-contact">
                            {report.volunteer_email && (
                              <span className="contact-item">{report.volunteer_email}</span>
                            )}
                            {report.volunteer_phone && (
                              <span className="contact-item">{report.volunteer_phone}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button 
                        className="btn danger small"
                        onClick={() => onUnassign(report.report_id)}
                      >
                        Unassign
                      </button>
                    </div>
                  ) : (
                    <div className="no-volunteer">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <p>No volunteer assigned</p>
                      <button 
                        className="btn text"
                        onClick={onAssignClick}
                      >
                        Click to assign a volunteer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h4>Report Description</h4>
                </div>
                <div className="card-content">
                  <div className="description-text">
                    <p>{report.description}</p>
                  </div>
                  {report.user_note && (
                    <div className="user-note">
                      <div className="note-label">Additional Note:</div>
                      <p>{report.user_note}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h4>Admin Notes</h4>
                </div>
                <div className="card-content">
                  <form onSubmit={handleSaveNote} className="notes-form">
                    <textarea
                      className="notes-input"
                      placeholder="Add internal notes about this report..."
                      value={localAdminNote}
                      onChange={(e) => setLocalAdminNote(e.target.value)}
                      rows={3}
                    />
                    <div className="notes-actions">
                      <button
                        type="submit"
                        className="btn primary small"
                        disabled={savingNote || !localAdminNote.trim()}
                      >
                        {savingNote ? 'Saving...' : 'Save Note'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const RescueReports: React.FC = () => {
  const [reports, setReports] = useState<RescueReport[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState('');

  const statusConfig = [
    { id: 1, name: 'Submitted', color: '#6366F1', bgColor: '#EEF2FF' },
    { id: 2, name: 'Assigned', color: '#0EA5E9', bgColor: '#F0F9FF' },
    { id: 3, name: 'In Progress', color: '#10B981', bgColor: '#F0FDF4' },
    { id: 4, name: 'Completed', color: '#8B5CF6', bgColor: '#F5F3FF' },
    { id: 5, name: 'Declined', color: '#EF4444', bgColor: '#FEF2F2' }
  ];

  const getStatusName = (statusId: number): string => {
    const status = statusConfig.find(s => s.id === statusId);
    return status ? status.name : 'Unknown';
  };

  const getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    if (type === 'success') {
      setShowSuccessMessage(true);
    } else {
      setShowErrorMessage(true);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setMessage('');
    }, 3000);
  };

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      
      const token = getToken();
      if (!token) {
        showMessage('Please login first', 'error');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/reports/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const reportsData = data.data || [];
          
          const mappedReports = reportsData.map((report: any) => ({
            report_id: report.report_id,
            user_id: report.user_id,
            username: report.reporter_name || 'Anonymous',
            email: report.email,
            phone: report.reporter_phone || 'No phone',
            description: report.description,
            location_address: report.location_address,
            user_note: report.user_note,
            admin_note: report.admin_note,
            submitted_at: report.submitted_at,
            animal_type: report.animal_type,
            animal_condition: report.animal_condition,
            status_id: report.status_id,
            volunteer_name: report.volunteer_name,
            volunteer_id: report.volunteer_id,
            volunteer_email: report.volunteer_email,
            volunteer_phone: report.volunteer_phone
          }));
          
          setReports(mappedReports);
        } else {
          showMessage(data.message || 'Failed to load reports', 'error');
        }
      } else {
        showMessage('Failed to fetch reports', 'error');
      }
    } catch (error: any) {
      console.error('Network error fetching reports:', error);
      showMessage('Error loading reports. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVolunteers = useCallback(async () => {
    try {
      setLoadingVolunteers(true);
      
      const token = getToken();
      if (!token) {
        setVolunteers([]);
        setLoadingVolunteers(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/volunteers/available', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const volunteersData = data.data || [];
          
          const mappedVolunteers = volunteersData.map((volunteer: any) => ({
            user_id: volunteer.user_id,
            username: volunteer.username,
            email: volunteer.email,
            phone: volunteer.phone || 'Not provided',
            bio: volunteer.bio,
            joined_at: volunteer.joined_at || volunteer.created_at,
            approval_status: volunteer.approval_status,
            approval_status_id: volunteer.approval_status_id,
            availability_status: volunteer.availability_status,
            availability_status_id: volunteer.availability_status_id,
            assigned_reports_count: volunteer.assigned_reports_count || 0,
            role_id: volunteer.role_id,
            created_at: volunteer.created_at
          }));
          
          setVolunteers(mappedVolunteers);
        } else {
          console.error('Failed to load volunteers:', data.message);
          setVolunteers([]);
        }
      } else {
        console.error('HTTP Error fetching volunteers:', response.status);
        setVolunteers([]);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setVolunteers([]);
    } finally {
      setLoadingVolunteers(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
    fetchVolunteers();
  }, [fetchReports, fetchVolunteers]);

  const assignVolunteer = async (reportId: number, volunteerId: number, volunteerName: string) => {
    try {
      const token = getToken();
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      const response = await fetch('http://localhost:5000/api/volunteers/assign', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          report_id: reportId,
          volunteer_id: volunteerId,
          status_id: 2
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        const volunteer = volunteers.find(v => v.user_id === volunteerId);
        
        setReports(prev => prev.map(report => {
          if (report.report_id === reportId) {
            return {
              ...report,
              volunteer_id: volunteerId,
              volunteer_name: volunteerName,
              volunteer_email: volunteer?.email || '',
              volunteer_phone: volunteer?.phone || '',
              status_id: 2
            };
          }
          return report;
        }));
        
        setVolunteers(prev => prev.map(v => {
          if (v.user_id === volunteerId) {
            return {
              ...v,
              assigned_reports_count: (v.assigned_reports_count || 0) + 1
            };
          }
          return v;
        }));
        
        showMessage(`Volunteer "${volunteerName}" assigned successfully!`, 'success');
        setIsVolunteerModalOpen(false);
        setSelectedReport(null);
        fetchReports();
        fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to assign volunteer', 'error');
      }
    } catch (error: any) {
      console.error('Error assigning volunteer:', error);
      showMessage(error.message || 'Error assigning volunteer. Please try again.', 'error');
    }
  };

  const unassignVolunteer = async (reportId: number) => {
    if (!window.confirm('Are you sure you want to unassign this volunteer? The status will be reset to "Submitted".')) return;
    
    try {
      const token = getToken();
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/unassign`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const report = reports.find(r => r.report_id === reportId);
        const volunteerId = report?.volunteer_id;
        
        setReports(prev => prev.map(report => {
          if (report.report_id === reportId) {
            return {
              ...report,
              volunteer_id: undefined,
              volunteer_name: undefined,
              volunteer_email: undefined,
              volunteer_phone: undefined,
              status_id: 1
            };
          }
          return report;
        }));
        
        if (volunteerId) {
          setVolunteers(prev => prev.map(v => {
            if (v.user_id === volunteerId) {
              return {
                ...v,
                assigned_reports_count: Math.max(0, (v.assigned_reports_count || 0) - 1)
              };
            }
            return v;
          }));
        }
        
        showMessage('Volunteer unassigned successfully!', 'success');
        fetchReports();
        fetchVolunteers();
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to unassign volunteer', 'error');
      }
    } catch (error: any) {
      console.error('Error unassigning volunteer:', error);
      showMessage(error.message || 'Error unassigning volunteer. Please try again.', 'error');
    }
  };

  const getAnimalEmoji = (animalType: string): string => {
    const type = animalType?.toLowerCase() || '';
    if (type.includes('dog')) return '🐶';
    if (type.includes('cat')) return '🐱';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit')) return '🐰';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle')) return '🐢';
    if (type.includes('snake')) return '🐍';
    if (type.includes('fish')) return '🐟';
    return '🐾';
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatVolunteerDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredReports = reports
    .filter(report => {
      if (filterStatus !== 'all') {
        const statusMap: { [key: string]: number } = {
          'submitted': 1,
          'assigned': 2,
          'in-progress': 3,
          'completed': 4,
          'declined': 5
        };
        if (report.status_id !== statusMap[filterStatus]) return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.username?.toLowerCase().includes(query) ||
          report.animal_type?.toLowerCase().includes(query) ||
          report.location_address?.toLowerCase().includes(query) ||
          report.description?.toLowerCase().includes(query) ||
          report.report_id.toString().includes(query) ||
          report.volunteer_name?.toLowerCase().includes(query) ||
          report.phone?.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'recent':
          return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        case 'oldest':
          return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        case 'critical':
          const getCriticalScore = (condition: string) => {
            const cond = condition?.toLowerCase() || '';
            if (cond.includes('critical')) return 0;
            if (cond.includes('severe')) return 1;
            if (cond.includes('urgent')) return 2;
            return 3;
          };
          return getCriticalScore(a.animal_condition) - getCriticalScore(b.animal_condition);
        case 'status':
          return a.status_id - b.status_id;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading rescue reports...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="notification success">
          <span>✅ {message}</span>
        </div>
      )}
      {showErrorMessage && (
        <div className="notification error">
          <span>❌ {message}</span>
        </div>
      )}

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>Rescue Reports</h1>
          <p>Manage and assign animal rescue reports to volunteers</p>
        </div>
        <div className="header-actions">
          <button onClick={fetchReports} className="btn secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
              <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="filters">
        <div className="search-container">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
              type="button"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="critical">Critical First</option>
              <option value="status">By Status</option>
            </select>
          </div>

          <div className="results-count">
            {filteredReports.length} of {reports.length} reports
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="content">
        {filteredReports.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3>No Reports Found</h3>
            <p>
              {searchQuery 
                ? `No reports match "${searchQuery}"` 
                : filterStatus !== 'all'
                ? `No reports with status "${filterStatus}"`
                : 'There are no rescue reports yet.'}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                }}
                className="btn outline"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="reports-table">
            <table>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Animal</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Volunteer</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.report_id}>
                    <td>
                      <div className="report-id">#{report.report_id}</div>
                    </td>
                    <td>
                      <div className="animal-cell">
                        <span className="animal-emoji">{getAnimalEmoji(report.animal_type)}</span>
                        <div>
                          <div className="animal-type">{report.animal_type}</div>
                          <div className="animal-condition">{report.animal_condition}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="location-cell">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{report.location_address}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${getStatusName(report.status_id).toLowerCase().replace(' ', '-')}`}>
                        {getStatusName(report.status_id)}
                      </span>
                    </td>
                    <td>
                      {report.volunteer_name ? (
                        <div className="volunteer-cell">
                          <div className="volunteer-avatar small">
                            {report.volunteer_name.charAt(0).toUpperCase()}
                          </div>
                          <span>{report.volunteer_name}</span>
                        </div>
                      ) : (
                        <span className="no-volunteer">Not assigned</span>
                      )}
                    </td>
                    <td>
                      <div className="date-cell">
                        {formatDate(report.submitted_at)}
                      </div>
                    </td>
                    <td>
                      <button 
                        onClick={() => {
                          setSelectedReport(report);
                          setIsModalOpen(true);
                        }}
                        className="btn primary small"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      <ReportDetailModal 
        report={selectedReport} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReport(null);
        }}
        onAssignClick={() => {
          setIsModalOpen(false);
          setIsVolunteerModalOpen(true);
        }}
        onUnassign={unassignVolunteer}
        getToken={getToken}
        getAnimalEmoji={getAnimalEmoji}
        formatDate={formatDate}
        statusConfig={statusConfig}
        getStatusName={getStatusName}
        showMessage={showMessage}
      />

      {/* Volunteer Selection Modal */}
      <VolunteerSelectModal
        report={selectedReport}
        isOpen={isVolunteerModalOpen}
        onClose={() => {
          setIsVolunteerModalOpen(false);
          setIsModalOpen(true);
        }}
        onSelect={(volunteer) => {
          if (selectedReport) {
            assignVolunteer(selectedReport.report_id, volunteer.user_id, volunteer.username);
          }
        }}
        volunteers={volunteers}
        loadingVolunteers={loadingVolunteers}
        statusConfig={statusConfig}
        getStatusName={getStatusName}
        getAnimalEmoji={getAnimalEmoji}
        formatVolunteerDate={formatVolunteerDate}
      />
    </div>
  );
};

export default RescueReports;