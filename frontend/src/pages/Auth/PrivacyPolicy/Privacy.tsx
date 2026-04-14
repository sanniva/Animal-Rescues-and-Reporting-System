import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "../TermsOfService/terms.css";

export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="terms">

      {/* ── NAV ── */}
      <nav className="terms-nav">
        <div className="terms-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="terms-nav-paw" />
          <span>RESQALL</span>
        </div>
        <div className="terms-nav-links">
          <button className="terms-nav-link" onClick={() => navigate("/about")}>About Us</button>
          <button className="terms-nav-link" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="terms-nav-link" onClick={() => navigate("/contact")}>Contact</button>
          <button className="terms-nav-link" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="terms-btn terms-btn-amber" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* HERO*/}
      <section className="terms-hero">
        <div className="terms-hero-blob terms-hero-blob-tr" />
        <div className="terms-hero-blob terms-hero-blob-bl" />
        <div className="terms-hero-grain" />
        <div className="terms-hero-inner">
          <div className="terms-eyebrow">
            <Icon type="fa" name="FaShieldAlt" size={13} className="terms-eyebrow-icon" />
            Privacy
          </div>
          <h1 className="terms-hero-headline">
            Privacy <em>Policy</em>
          </h1>
          <p className="terms-hero-sub">
            Last Updated: March 15, 2024
          </p>
        </div>
      </section>

      {/*  TRUST BAR */}
      <div className="terms-trust">
        {[
          { type: "fa", name: "FaShieldAlt", label: "Your Data Protected" },
          { type: "fa", name: "FaLock", label: "Secure & Private" },
          { type: "fa", name: "FaEye", label: "Transparent" },
          { type: "fa", name: "FaHeart", label: "We Value You" },
        ].map(({ type, name, label }) => (
          <div className="terms-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="terms-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* CONTENT  */}
      <section className="terms-section-main">
        <div className="terms-container">
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
              <div className="terms-contact-box">
                <p>Email: privacy@resqall.org</p>
                <p>Address: Kathmandu, Nepal</p>
                <p>Phone: +977 98XXXXXXXX</p>
              </div>
            </div>
          </div>

          <div className="terms-footer">
            <button className="terms-btn terms-btn-ghost" onClick={() => navigate("/")}>
              <Icon type="fa" name="FaArrowLeft" size={14} />
              Back to Home
            </button>
            <div className="terms-footer-links">
              <button className="terms-footer-link" onClick={() => navigate("/terms")}>Terms</button>
              <button className="terms-footer-link" onClick={() => navigate("/privacy")}>Privacy</button>
              <button className="terms-footer-link" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="terms-footer-main">
        <div className="terms-footer-grid">
          <div className="terms-footer-brand">
            <div className="terms-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="terms-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7 with verified rangers and trusted vet partners.</p>
            <div className="terms-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="terms-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>

          <div className="terms-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {["About Us", "Our Mission", "Contact", "FAQ"].map(l => (
                <li key={l}><button onClick={() => navigate("/")}>{l}</button></li>
              ))}
            </ul>
          </div>

          <div className="terms-footer-col">
            <h4>Get Involved</h4>
            <ul>
              {["Become a Ranger", "Report Animal", "Partner With Us"].map(l => (
                <li key={l}><button onClick={() => navigate("/login")}>{l}</button></li>
              ))}
            </ul>
          </div>

          <div className="terms-footer-col">
            <h4>Emergency Contact</h4>
            <div className="terms-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} />
              24/7 Hotline
            </div>
            <div className="terms-footer-number">1-800-RESQALL</div>
            <div className="terms-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} />
              rescue@resqall.org
            </div>
            <button className="terms-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>

        <div className="terms-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="terms-footer-heart" />
          <span>for animal rescue.</span>
        </div>
      </footer>
    </div>
  );
};