import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon"; // Adjust the import path as needed
import "../TermsOfService/terms.css";

export const Privacy: React.FC = () => {
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: March 15, 2024</p>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Introduction</h2>
            <p>At ResQAll Network, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.</p>
          </div>

          <div className="terms-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register for an account (name, email, phone number)</li>
              <li>Create volunteer profiles (location, vehicle information, animal handling experience)</li>
              <li>Report animal rescues (location, description, contact information)</li>
              <li>Communicate with other users</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you use our platform, we may automatically collect:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, actions taken)</li>
              <li>Location data (with your permission during active rescue missions)</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Match animal reports with appropriate volunteers</li>
              <li>Facilitate rescue missions</li>
              <li>Communicate with you about your reports and tasks</li>
              <li>Improve our services and user experience</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. Location Tracking</h2>
            <p>During active rescue missions, volunteers may choose to share their location to:</p>
            <ul>
              <li>Track progress to the rescue location</li>
              <li>Provide estimated arrival times</li>
              <li>Ensure volunteer safety</li>
              <li>Coordinate with other volunteers if needed</li>
            </ul>
            <p>Location tracking is optional and can be disabled at any time. You can also revoke location permissions through your browser or device settings.</p>
          </div>

          <div className="terms-section">
            <h2>5. Information Sharing</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>With Volunteers/Reporters:</strong> To facilitate rescue missions, we share relevant information between parties involved in a rescue.</li>
              <li><strong>With Service Providers:</strong> We may use third-party services for analytics, hosting, and communication.</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect rights and safety.</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Data Storage</h2>
            <p>We use browser storage mechanisms to maintain your session:</p>
            <ul>
              <li><strong>Session Storage:</strong> For regular logins, we store your authentication token in session storage. This data is automatically cleared when you close your browser tab or window.</li>
              <li><strong>Local Storage:</strong> Only when you check "Remember me for 30 days" during login, we store your authentication token in local storage to maintain your session across browser restarts.</li>
            </ul>
            <p>We do not use cookies for authentication or tracking purposes. You can clear this data at any time through your browser settings.</p>
          </div>

          <div className="terms-section">
            <h2>7. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure socket layer technology (SSL)</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>
            <p>However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          </div>

          <div className="terms-section">
            <h2>8. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide services:</p>
            <ul>
              <li><strong>Session data:</strong> Cleared when you close your browser (for regular logins)</li>
              <li><strong>Persistent sessions:</strong> Stored for 30 days only if you select "Remember Me"</li>
              <li><strong>Account information:</strong> Retained until you delete your account</li>
            </ul>
            <p>You may request deletion of your account, and we will delete your information within a reasonable timeframe, except where retention is required by law.</p>
          </div>

          <div className="terms-section">
            <h2>9. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Object to processing</li>
              <li>Export your data</li>
              <li>Withdraw consent</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@resqall.org.</p>
          </div>

          <div className="terms-section">
            <h2>10. Children's Privacy</h2>
            <p>Our services are not intended for individuals under 13. We do not knowingly collect information from children under 13. If you become aware that a child has provided us with personal information, please contact us.</p>
          </div>

          <div className="terms-section">
            <h2>11. Third-Party Links</h2>
            <p>Our platform may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their privacy policies.</p>
          </div>

          <div className="terms-section">
            <h2>12. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>
          </div>

          <div className="terms-section">
            <h2>13. Changes to Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes through the platform or via email. Continued use after changes constitutes acceptance.</p>
          </div>

          <div className="terms-section">
            <h2>14. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
            <p className="contact-info">
              Email: privacy@resqall.org<br />
              Address: Kathmandu, Nepal<br />
              Phone: +977 98XXXXXXXX
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