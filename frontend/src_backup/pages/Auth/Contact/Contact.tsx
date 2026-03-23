import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon"; 
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-top"></div>
      <div className="bg-shape bg-shape-bottom"></div>
      <div className="bg-circle-right"></div>
      <div className="bg-circle-left"></div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="section-badge">
            <span className="badge-icon">
              <Icon type="fa" name="FaPhone" size={16} />
            </span>
            <span>Get in Touch</span>
          </div>
          <h1 className="hero-title">
            Contact <span>Us</span>
          </h1>
          <p className="hero-description">
            Have questions? Want to get involved? Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="contact-grid">
        <div className="contact-info">
          <h2 className="info-title">
            Let's <span>Talk</span>
          </h2>
          
          <div className="info-card">
            <div className="info-icon-wrapper">
              <Icon type="fa" name="FaPhone" size={24} className="info-icon" />
            </div>
            <div className="info-content">
              <h3>Emergency Hotline</h3>
              <p className="emergency-number-large">1-800-RESQALL</p>
              <p className="emergency-number-small">(1-800-737-7255)</p>
              <p className="info-note">
                <Icon type="fa" name="FaMobile" size={12} /> Available 24/7 for emergencies
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <Icon type="fa" name="FaEnvelope" size={24} className="info-icon" />
            </div>
            <div className="info-content">
              <h3>Email Us</h3>
              <p className="info-email">rescue@resqall.org</p>
              <p className="info-email">info@resqall.org</p>
              <p className="info-note">
                <Icon type="fa" name="FaClock" size={12} /> We reply within 24 hours
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <Icon type="fa" name="FaMapMarkerAlt" size={24} className="info-icon" />
            </div>
            <div className="info-content">
              <h3>Visit Us</h3>
              <p>123 Rescue Street</p>
              <p>Kathmandu, Nepal 44600</p>
              <p className="info-note">
                <Icon type="fa" name="FaBuilding" size={12} /> Open Mon-Fri, 9am-5pm
              </p>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <span className="social-icon" title="Facebook">
                <Icon type="fa" name="FaFacebookF" size={20} />
              </span>
              <span className="social-icon" title="Instagram">
                <Icon type="fa" name="FaInstagram" size={20} />
              </span>
              <span className="social-icon" title="Twitter">
                <Icon type="fa" name="FaTwitter" size={20} />
              </span>
              <span className="social-icon" title="TikTok">
                <Icon type="fa" name="FaTiktok" size={20} />
              </span>
            </div>
          </div>
        </div>

        <div className="contact-info-static">
          <h2 className="info-title">
            Get in <span>Touch</span>
          </h2>
          
          <div className="static-contact-card">
            <div className="static-contact-header">
              <Icon type="fa" name="FaEnvelopeOpenText" size={24} className="static-contact-icon" />
              <h3>Send us a message</h3>
            </div>
            
            <p className="static-contact-text">
              We'd love to hear from you! Whether you have questions about volunteering, 
              want to report an emergency, or are interested in partnering with us, 
              our team is here to help.
            </p>
            
            <div className="emergency-highlight">
              <span className="emergency-badge">
                <Icon type="fa" name="FaExclamationTriangle" size={14} /> 24/7 EMERGENCY
              </span>
              <p className="emergency-big-number">1-800-RESQALL</p>
              <p className="emergency-dial-number">Dial: 1-800-737-7255</p>
            </div>
            
            <div className="static-contact-details">
              <div className="static-detail-item">
                <span className="detail-label">
                  <Icon type="fa" name="FaEnvelope" size={14} /> Email:
                </span>
                <span className="detail-value">rescue@resqall.org</span>
              </div>
              <div className="static-detail-item">
                <span className="detail-label">
                  <Icon type="fa" name="FaPhone" size={14} /> Phone:
                </span>
                <span className="detail-value">1-800-RESQALL</span>
              </div>
              <div className="static-detail-item">
                <span className="detail-label">
                  <Icon type="fa" name="FaClock" size={14} /> Hours:
                </span>
                <span className="detail-value">24/7 Emergency</span>
              </div>
              <div className="static-detail-item">
                <span className="detail-label">
                  <Icon type="fa" name="FaBuilding" size={14} /> Office:
                </span>
                <span className="detail-value">Mon-Fri, 9am-5pm</span>
              </div>
            </div>

            <div className="static-contact-cta">
              <p>
                <Icon type="fa" name="FaPen" size={14} /> Prefer to write? Drop us a line at:
              </p>
              <address>
                <strong>ResQAll Headquarters</strong><br />
                123 Rescue Street<br />
                Kathmandu, Nepal 44600
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            title="ResQAll Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.999734517!2d85.2239805!3d27.70893895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bg-wave"></div>
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">
                <Icon type="fa" name="FaPaw" size={24} />
              </span>
              <span className="logo-text">RESQALL</span>
            </div>
            <p className="footer-description">Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="footer-social-mini">
              <span className="footer-social-icon">
                <Icon type="fa" name="FaFacebookF" size={16} />
              </span>
              <span className="footer-social-icon">
                <Icon type="fa" name="FaInstagram" size={16} />
              </span>
              <span className="footer-social-icon">
                <Icon type="fa" name="FaTwitter" size={16} />
              </span>
              <span className="footer-social-icon">
                <Icon type="fa" name="FaTiktok" size={16} />
              </span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/mission">Our Mission</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul className="footer-links-list">
              <li><Link to="/login">Become a Ranger</Link></li>
              <li><Link to="/login">Report Animal</Link></li>
              <li><Link to="/login">Partner With Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Emergency</h4>
            <div className="footer-emergency">
              <p className="footer-emergency-label">
                <Icon type="fa" name="FaPhone" size={12} /> 24/7 Hotline
              </p>
              <p className="footer-emergency-number">1-800-RESQALL</p>
              <p className="footer-emergency-dial">1-800-737-7255</p>
              <p className="footer-email">
                <Icon type="fa" name="FaEnvelope" size={12} /> rescue@resqall.org
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ResQAll. All rights reserved. Made with <Icon type="fa" name="FaHeart" size={14} color="#ff4444" /> for animal rescue in Nepal.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;