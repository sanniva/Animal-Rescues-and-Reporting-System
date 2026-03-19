import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon"; // Adjust the import path as needed
import "./terms.css";

export const Terms: React.FC = () => {
  return (
    <div className="terms-wrapper">
      {/* Background Shapes */}
      <div className="bg-shape-top"></div>
      <div className="bg-shape-bottom"></div>
      <div className="bg-wave"></div>
      
      <div className="terms-container">
        <div className="terms-header">
          <Link to="/" className="logo">
            <Icon type="fa" name="FaPaw" size={48} color="#2D5A27" />
          </Link>
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: March 15, 2024</p>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>Welcome to ResQAll Network. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree to all terms, please do not use our services.</p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>ResQAll Network is a platform that connects animal rescue reporters with volunteers and facilitates animal rescue operations. Our services include:</p>
            <ul>
              <li>Reporting animals in need of rescue</li>
              <li>Connecting reporters with volunteer rescuers</li>
              <li>Tracking rescue missions and their progress</li>
              <li>Providing a communication platform for rescue coordination</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. User Accounts</h2>
            <p>To use certain features, you must create an account. You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Updating your information when necessary</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. User Responsibilities</h2>
            <p>As a user of ResQAll Network, you agree to:</p>
            <ul>
              <li>Provide accurate information about animal rescue situations</li>
              <li>Use the platform for legitimate rescue purposes only</li>
              <li>Treat all users with respect and professionalism</li>
              <li>Follow all applicable laws and regulations</li>
              <li>Not misuse or abuse the platform's features</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Volunteer Requirements</h2>
            <p>Volunteers must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Provide accurate information about their capabilities</li>
              <li>Complete all assigned tasks responsibly</li>
              <li>Upload evidence of completed rescues</li>
              <li>Maintain professional conduct at all times</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Reporting Guidelines</h2>
            <p>When reporting an animal in need:</p>
            <ul>
              <li>Provide accurate location information</li>
              <li>Describe the animal's condition truthfully</li>
              <li>Include any relevant details that may help rescuers</li>
              <li>Update the report if the situation changes</li>
              <li>Do not submit false or misleading reports</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>7. Privacy and Data Protection</h2>
            <p>Your privacy is important to us. Please review our <Link to="/privacy">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.</p>
          </div>

          <div className="terms-section">
            <h2>8. Intellectual Property</h2>
            <p>All content on ResQAll Network, including logos, designs, text, and software, is the property of ResQAll and protected by copyright and other intellectual property laws.</p>
          </div>

          <div className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>ResQAll Network is provided "as is" without warranties of any kind. We are not liable for:</p>
            <ul>
              <li>The outcome of any rescue mission</li>
              <li>Actions taken by volunteers or reporters</li>
              <li>Technical issues or service interruptions</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>10. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior. You may also delete your account at any time.</p>
          </div>

          <div className="terms-section">
            <h2>11. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
          </div>

          <div className="terms-section">
            <h2>12. Contact Information</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <p className="contact-info">
              Email: legal@resqall.org<br />
              Address: Kathmandu, Nepal
            </p>
          </div>
        </div>

        <div className="terms-footer">
          <Link to="/" className="back-button">
            <Icon type="fa" name="FaArrowLeft" size={14} /> Back to Home
          </Link>
          <div className="footer-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
