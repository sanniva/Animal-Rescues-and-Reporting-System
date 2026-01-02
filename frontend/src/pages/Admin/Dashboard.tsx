import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import Icon from '../../components/Icon';
import { useAuth } from '../../context/AuthContext'; 
import './Dashboard.css';

// Mock data types
interface Report {
  id: string;
  userId: string;
  animalType: string;
  description: string;
  location: string;
  photoUrl: string;
  condition: 'critical' | 'moderate' | 'mild';
  status: 'submitted' | 'in-progress' | 'completed';
  assignedTo: string | null;
  createdAt: string;
}

// Mock reports data
const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    userId: '2',
    animalType: 'Dog',
    description: 'Injured stray dog found near Central Park',
    location: 'Central Park, NYC',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    condition: 'critical',
    status: 'in-progress',
    assignedTo: '3',
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: '2',
    userId: '2',
    animalType: 'Cat',
    description: 'Kitten stuck in tree for 2 days',
    location: 'Brooklyn Heights',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba14',
    condition: 'moderate',
    status: 'submitted',
    assignedTo: null,
    createdAt: new Date('2024-03-11').toISOString(),
  },
  {
    id: '3',
    userId: '2',
    animalType: 'Bird',
    description: 'Bird with broken wing in backyard',
    location: 'Queens Botanical Garden',
    photoUrl: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
    condition: 'mild',
    status: 'completed',
    assignedTo: '3',
    createdAt: new Date('2024-03-05').toISOString(),
  },
];

// Mock users data - You should have this in your auth system
const MOCK_USERS = {
  admin: {
    id: '1',
    email: 'admin@resqall.com',
    username: 'ResQAll Commander',
    role: 'admin',
    badges: [1, 2, 3, 4, 5, 6]
  },
  volunteer: {
    id: '3',
    email: 'sam@resqall.com',
    username: 'Ranger Sam',
    role: 'volunteer',
    volunteerStatus: 'approved',
    badges: [1, 2, 3]
  },
  volunteer_pending: {
    id: '4',
    email: 'will@example.com',
    username: 'Will',
    role: 'volunteer',
    volunteerStatus: 'pending',
    badges: []
  },
  user: {
    id: '2',
    email: 'user@example.com',
    username: 'Niva Shakya',
    role: 'user',
    badges: []
  }
};

export const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const navigate = useNavigate();
  
  // Use your actual auth context here
  const { user: currentUser, logout } = useAuth();
  

  // This simulates different users based on URL or localStorage
  const [demoUser, setDemoUser] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Check for demo user in localStorage or URL params
    const userType = localStorage.getItem('demoUserType') || 'user';
    setDemoUser(MOCK_USERS[userType as keyof typeof MOCK_USERS]);
  }, []);
  
  // Use demo user if no real auth user exists (for testing)
  const displayUser = currentUser || demoUser;
  
  const reports = MOCK_REPORTS;

  // Redirect if not authenticated
  useEffect(() => {
    if (!displayUser) {
      navigate('/login');
    }
  }, [displayUser, navigate]);

  const handleOpenNotifications = () => {
    console.log('Opening notifications...');
    setUnreadNotifications(0);
  };

  if (!displayUser) {
    return (
      <div className="dashboard-wrapper">
        <div className="no-access">
          <h2>Loading...</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Stats calculation based on current user role
  const getStats = () => {
    const totalReports = reports.length;
    const completedRescues = reports.filter(r => r.status === 'completed').length;
    const activeVolunteers = 2; // Mock data - volunteers with status 'approved'
    const pendingApprovals = 1; // Mock data - volunteers with status 'pending'
    const myReports = reports.filter(r => r.userId === displayUser.id);
    const myCompletedTasks = reports.filter(r => r.assignedTo === displayUser.id && r.status === 'completed').length;

    return {
      totalReports,
      completedRescues,
      activeVolunteers,
      pendingApprovals,
      myReports: myReports.length,
      myCompletedTasks,
    };
  };

  const stats = getStats();

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Icon type="feather" name="FiMenu" size={24} color="#065f46" />
      </button>
      
      {/* Main Content - Show different dashboard based on role */}
      <div className="dashboard-content">
        {displayUser.role === 'admin' ? (
          <AdminDashboard stats={stats} />
        ) : displayUser.role === 'volunteer' ? (
          displayUser.volunteerStatus === 'pending' ? (
            <PendingVolunteerDashboard user={displayUser} />
          ) : displayUser.volunteerStatus === 'rejected' ? (
            <RejectedVolunteerDashboard />
          ) : (
            <VolunteerDashboard user={displayUser} stats={stats} reports={reports} />
          )
        ) : (
          <UserDashboard user={displayUser} stats={stats} reports={reports} />
        )}
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard: React.FC<{ stats: any }> = ({ stats }) => {
  const chartData = [
    { name: 'Reports', value: stats.totalReports },
    { name: 'Rescued', value: stats.completedRescues },
    { name: 'Volunteers', value: stats.activeVolunteers },
  ];
  const COLORS = ['#A67C52', '#2D5A27', '#7D8C5A'];

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="admin-dashboard">
        <h2 className="admin-header">ResQAll Global Overview</h2>
        
        {/* Stats Grid */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <p className="stat-label">Pending Operatives</p>
            <div className="stat-content">
              <div className="stat-value stat-value-earth">{stats.pendingApprovals}</div>
              {stats.pendingApprovals > 0 && (
                <Link to="/admin/volunteers" className="stat-alert animate-pulse">
                  Review Now
                </Link>
              )}
            </div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Field Rangers</p>
            <div className="stat-value stat-value-emerald">{stats.activeVolunteers}</div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Mission Reports</p>
            <div className="stat-value stat-value-emerald">{stats.totalReports}</div>
          </div>
          
          <div className="stat-card">
            <p className="stat-label">Saved Lives</p>
            <div className="stat-value stat-value-moss">{stats.completedRescues}</div>
          </div>
        </div>

        {/* Charts & Actions */}
        <div className="admin-charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Operational Metrics</h3>
            
            {/* Recharts Bar Chart */}
            <div className="recharts-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#F5F1E8'}} 
                    formatter={(value) => [value, 'Count']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[10, 10, 0, 0]}
                    barSize={60}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="volunteer-alert-box">
            <div className="volunteer-alert-icon">
              <Icon type="feather" name="FiAlertTriangle" size={200} color="white" />
            </div>
            <h3 className="volunteer-alert-title">Volunteer Queue</h3>
            <p className="volunteer-alert-text">
              There are {stats.pendingApprovals} rangers waiting for activation to join the ResQAll squad.
            </p>
            <Link to="/admin/volunteers" className="volunteer-alert-btn">
              Manage Operatives
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Volunteer Dashboard Component
const VolunteerDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
  const myTasks = reports.filter(r => r.assignedTo === user.id);
  const inProgressTask = myTasks.find(t => t.status === 'in-progress');
  const pendingTasks = myTasks.filter(t => t.status === 'submitted');

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="volunteer-dashboard">
        {/* Header & Stats */}
        <div className="volunteer-header-grid">
          <div className="volunteer-welcome-card">
            <div className="volunteer-welcome-paw">
              <Icon type="fa" name="FaPaw" size={200} color="white" />
            </div>
            <h2 className="volunteer-welcome-title">Welcome back, Operative {user.username}</h2>
            <p className="volunteer-welcome-text">
              Scanning sectors for animals in need. Ready for your next mission?
            </p>
            <div className="volunteer-welcome-btns">
              <Link to="/tasks" className="welcome-btn welcome-btn-primary">
                Open Mission Board
              </Link>
              <Link to="/profile" className="welcome-btn welcome-btn-secondary">
                My Service Medals
              </Link>
            </div>
          </div>

          <div className="volunteer-stats-column">
            <div className="volunteer-stat-card">
              <div className="stat-info">
                <p className="stat-label-small">Successful Rescues</p>
                <p className="stat-value-large">{stats.myCompletedTasks}</p>
              </div>
              <div className="stat-icon stat-icon-success">
                <Icon type="feather" name="FiCheckCircle" size={24} color="#065f46" />
              </div>
            </div>
            
            <div className="volunteer-stat-card">
              <div className="stat-info">
                <p className="stat-label-small">Ranger Rank</p>
                <p className="stat-value-medium">
                  {user.badges?.length > 5 ? 'Elite Guardian' : 
                   user.badges?.length > 2 ? 'Senior Ranger' : 'Rookie'}
                </p>
              </div>
              <div className="stat-icon stat-icon-rank">
                <Icon type="fa" name="FaAward" size={24} color="#a67c52" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Assignment Section */}
        <div className="mission-section">
          <h3 className="section-header">
            <Icon 
              type="feather" 
              name="FiRadio" 
              size={20} 
              className={`section-icon ${inProgressTask ? 'section-icon-active' : 'section-icon-inactive'}`} 
            />
            Active Assignment
          </h3>
          
          {inProgressTask ? (
            <div className="square-assignment-grid">
              {/* Active Mission Card - Square Design */}
              <div className="square-mission-card active">
                <div className="square-card-header">
                  <div className="square-status-badge in-field">IN FIELD</div>
                  <div className="square-volunteer-tag">{user.username?.toUpperCase()}</div>
                </div>
                
                <div className="square-card-content">
                  <div className="square-mission-title">
                    <h4 className="square-title">{inProgressTask.animalType} Mission</h4>
                    <span className="square-condition critical">{inProgressTask.condition}</span>
                  </div>
                  
                  <div className="square-location">
                    <Icon type="feather" name="FiMapPin" size={14} />
                    <span className="location-text">{inProgressTask.location}</span>
                  </div>
                  
                  <p className="square-description">
                    {inProgressTask.description.length > 80 
                      ? `${inProgressTask.description.substring(0, 80)}...` 
                      : inProgressTask.description}
                  </p>
                  
                  <div className="square-actions">
                    <Link 
                      to={`/tasks/${inProgressTask.id}`}
                      className="square-action-btn"
                    >
                      Update Report
                      <Icon type="feather" name="FiChevronRight" size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pending Tasks */}
              {pendingTasks.length > 0 && (
                <div className="square-mission-card pending">
                  <div className="square-card-header">
                    <div className="square-status-badge pending-badge">PENDING</div>
                    <div className="square-count">{pendingTasks.length} waiting</div>
                  </div>
                  
                  <div className="square-card-content">
                    <div className="square-mission-title">
                      <h4 className="square-title">Queued Missions</h4>
                      <span className="square-condition moderate">MODERATE</span>
                    </div>
                    
                    <div className="square-pending-list">
                      {pendingTasks.slice(0, 2).map((task, index) => (
                        <div key={task.id} className="pending-item">
                          <span className="pending-animal">{task.animalType}</span>
                          <span className="pending-location">
                            <Icon type="feather" name="FiMapPin" size={12} />
                            {task.location.split(',')[0]}
                          </span>
                        </div>
                      ))}
                      {pendingTasks.length > 2 && (
                        <div className="pending-more">
                          +{pendingTasks.length - 2} more missions
                        </div>
                      )}
                    </div>
                    
                    <div className="square-actions">
                      <Link to="/tasks" className="square-action-btn view-all">
                        View All
                        <Icon type="feather" name="FiChevronRight" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="square-assignment-grid">
              <div className="square-mission-card empty">
                <div className="square-card-content centered">
                  <div className="no-mission-icon">
                    <Icon type="feather" name="FiClock" size={32} color="#9ca3af" />
                  </div>
                  <h4 className="no-mission-title">No Active Missions</h4>
                  <p className="no-mission-text">
                    The sector is quiet. Head to the mission board to see new reports.
                  </p>
                  <Link to="/tasks" className="square-action-btn primary">
                    Go to Mission Board
                  </Link>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="square-mission-card stats">
                <div className="square-card-content">
                  <div className="quick-stats">
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        <Icon type="feather" name="FiCheckCircle" size={20} />
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">{stats.myCompletedTasks}</div>
                        <div className="quick-stat-label">Rescues</div>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        <Icon type="feather" name="FiClock" size={20} />
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">{pendingTasks.length}</div>
                        <div className="quick-stat-label">Pending</div>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <div className="quick-stat-icon">
                        <Icon type="feather" name="FiAward" size={20} />
                      </div>
                      <div className="quick-stat-info">
                        <div className="quick-stat-value">{user.badges?.length || 0}</div>
                        <div className="quick-stat-label">Badges</div>
                      </div>
                    </div>
                  </div>
                  <Link to="/profile" className="square-action-btn secondary">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Pending Volunteer Dashboard Component
const PendingVolunteerDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="pending-volunteer">
        <div className="pending-icon">
          <Icon type="feather" name="FiClock" size={64} color="#a67c52" />
        </div>
        <h2 className="pending-title">Activation Pending</h2>
        <p className="pending-text">
          Thank you for joining ResQAll. Our HQ is currently reviewing your ranger profile. 
          You will be notified via field log once approved.
        </p>
      </div>
    </div>
  );
};

// Rejected Volunteer Dashboard Component
const RejectedVolunteerDashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="rejected-volunteer">
        <h2 className="rejected-title">Application Status</h2>
        <p className="rejected-text">Unfortunately, your ResQAll operative status was not approved.</p>
      </div>
    </div>
  );
};

// User Dashboard Component
const UserDashboard: React.FC<{ user: any, stats: any, reports: Report[] }> = ({ user, stats, reports }) => {
  const myReports = reports.filter(r => r.userId === user.id);

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="user-dashboard">
        {/* Hero Banner */}
        <div className="user-hero-banner">
          <div className="user-hero-bg mask-image-gradient"></div>
          <div className="user-hero-content">
            <h2 className="user-hero-title">Protect the Streets</h2>
            <p className="user-hero-text">
              Spot an animal in distress? ResQAll rangers are on standby to respond to your report.
            </p>
            <Link to="/submit-report" className="user-hero-btn">
              <Icon type="feather" name="FiAlertTriangle" size={20} />
              File Field Report
            </Link>
          </div>
        </div>

        {/* Report History */}
        <div className="user-reports-section">
          <h3 className="user-reports-title">My Report History</h3>
          
          <div className="user-reports-table">
            {myReports.length > 0 ? (
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Animal</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myReports.map(report => (
                    <tr key={report.id}>
                      <td className="animal-type">{report.animalType}</td>
                      <td>{report.location}</td>
                      <td className="report-date">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`status-badge status-badge-${report.status}`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-reports">
                <p>You haven't filed any rescue reports yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;