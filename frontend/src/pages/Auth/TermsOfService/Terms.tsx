import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./terms.css";

export const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="terms">

      {/*  NAV  */}
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

      {/* ── HERO ── */}
      <section className="terms-hero">
        <div className="terms-hero-blob terms-hero-blob-tr" />
        <div className="terms-hero-blob terms-hero-blob-bl" />
        <div className="terms-hero-grain" />
        <div className="terms-hero-inner">
          <div className="terms-eyebrow">
            <Icon type="fa" name="FaFileAlt" size={13} className="terms-eyebrow-icon" />
            Legal
          </div>
          <h1 className="terms-hero-headline">
            Terms of <em>Service</em>
          </h1>
          <p className="terms-hero-sub">
            Last Updated: March 15, 2024
          </p>
        </div>
      </section>

      {/* TRUST BAR  */}
      <div className="terms-trust">
        {[
          { type: "fa", name: "FaShieldAlt", label: "Your Trust Matters" },
          { type: "fa", name: "FaHandshake", label: "Transparent Service" },
          { type: "fa", name: "FaBalanceScale", label: "Fair & Clear" },
          { type: "fa", name: "FaHeart", label: "Animal First" },
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
              <p>Your privacy is important to us. Please review our <button className="terms-inline-link" onClick={() => navigate("/privacy")}>Privacy Policy</button> to understand how we collect, use, and protect your personal information.</p>
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
              <div className="terms-contact-box">
                <p>Email: legal@resqall.org</p>
                <p>Address: Kathmandu, Nepal</p>
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

      {/* ── FOOTER ── */}
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