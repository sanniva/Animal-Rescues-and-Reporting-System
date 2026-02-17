import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Mission.css";

const Mission: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mission-page">
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-top"></div>
      <div className="bg-shape bg-shape-bottom"></div>
      <div className="bg-circle-right"></div>
      <div className="bg-circle-left"></div>

      {/* Hero Section */}
      <section className="mission-hero">
        <div className="mission-hero-content">
          <div className="section-badge">
            <span className="badge-icon">🐾</span>
            <span>Our Purpose</span>
          </div>
          <h1 className="hero-title">
            Our <span>Mission</span>
          </h1>
          <p className="hero-quote">"To create a world where no animal suffers alone, and every rescue leads to a second chance."</p>
        </div>
      </section>

      {/* Core Mission */}
      <section className="core-mission">
        <div className="mission-container">
          <div className="mission-statement">
            <h2 className="section-title">
              What We <span>Do</span>
            </h2>
            <p className="mission-text">ResQAll is a volunteer-powered emergency response network dedicated to rescuing all animals in distress. From street dogs and cats to injured birds, trapped cows, and wildlife – we respond to every creature in need. We connect people who find animals in distress with trained rangers who can respond immediately.</p>
            <div className="mission-highlights">
              <div className="highlight-card">
                <span className="highlight-number">24/7</span>
                <span className="highlight-text">Emergency Response</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-number">15min</span>
                <span className="highlight-text">Average Response</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-number">500+</span>
                <span className="highlight-text">Animals Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="pillars-section">
        <div className="section-header">
          <h2 className="section-title">
            Our <span>Pillars</span>
          </h2>
          <p className="section-subtitle">The foundation of everything we do</p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-number">01</div>
            <h3>Rapid Response</h3>
            <p>Every second counts when an animal is in distress. We ensure the fastest possible response to every emergency call, regardless of the species.</p>
            <div className="pillar-stat">⏱️ 15min avg response</div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">02</div>
            <h3>Quality Care</h3>
            <p>Partnering with veterinarians who treat all animals – from cats and dogs to cows, birds, and wildlife – providing the best medical care for every rescued creature.</p>
            <div className="pillar-stat">🏥 50+ vet partners</div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">03</div>
            <h3>Community Building</h3>
            <p>Growing a network of trained volunteers across Nepal who are ready to help any animal in need, fostering a culture of compassion for all living beings.</p>
            <div className="pillar-stat">👥 200+ rangers</div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">04</div>
            <h3>Education</h3>
            <p>Teaching communities about animal welfare, prevention, and the importance of protecting all creatures – big and small, domestic and wild.</p>
            <div className="pillar-stat">📚 1000+ people reached</div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="impact-container">
          <h2 className="impact-title">
            Our <span>Impact</span>
          </h2>
          <div className="impact-stats">
            <div className="impact-stat-card">
              <span className="impact-number">500+</span>
              <span className="impact-label">Animals Rescued</span>
            </div>
            <div className="impact-stat-card">
              <span className="impact-number">200+</span>
              <span className="impact-label">Active Rangers</span>
            </div>
            <div className="impact-stat-card">
              <span className="impact-number">50+</span>
              <span className="impact-label">Vet Partners</span>
            </div>
            <div className="impact-stat-card">
              <span className="impact-number">24/7</span>
              <span className="impact-label">Coverage</span>
            </div>
          </div>
          <div className="impact-species">
            <p>We've helped:</p>
            <div className="species-tags">
              <span className="species-tag">🐕 Dogs</span>
              <span className="species-tag">🐈 Cats</span>
              <span className="species-tag">🐄 Cows</span>
              <span className="species-tag">🐦 Birds</span>
              <span className="species-tag">🐐 Goats</span>
              <span className="species-tag">🐒 Wildlife</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-container">
          <div className="vision-content">
            <h2 className="section-title">
              Our <span>Vision</span>
            </h2>
            <p className="vision-text">We envision a Nepal where every animal in distress – whether a street dog, a stray cat, an injured bird, or a trapped cow – has someone to call. A country where animal welfare is a priority for all creatures, and where communities work together to protect the most vulnerable among us.</p>
            <div className="vision-quote">
              <span className="quote-mark">"</span>
              <p>Building a nation of animal lovers, one rescue at a time – for all animals.</p>
            </div>
          </div>
          <div className="vision-image">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Rescue team with animals"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mission-cta">
        <div className="cta-content">
          <h2 className="cta-title">
            Be Part of the <span>Mission</span>
          </h2>
          <p className="cta-text">Join us in making a difference for all animals. Every volunteer counts, every rescue matters.</p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate("/login")}>
              Become a Ranger
            </button>
            <button className="btn-outline btn-large" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bg-wave"></div>
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">RESQALL</span>
            </div>
            <p className="footer-description">Rapid response animal rescue network. Saving all animals 24/7 – dogs, cats, cows, birds, and wildlife.</p>
            <div className="footer-social">
              <span className="footer-social-icon">📘</span>
              <span className="footer-social-icon">📷</span>
              <span className="footer-social-icon">🐦</span>
              <span className="footer-social-icon">📱</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/mission">Our Mission</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/login">Become a Ranger</Link></li>
              <li><Link to="/login">Report an Animal</Link></li>
              <li><Link to="/login">Partner With Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Emergency</h4>
            <div className="footer-emergency">
              <p className="emergency-label">📞 24/7 Animal Rescue Hotline</p>
              <p className="emergency-number">1-800-RESQALL</p>
              <p className="emergency-dial">1-800-737-7255</p>
              <p className="footer-email">📧 rescue@resqall.org</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ResQAll. All rights reserved. Made with ❤️ for all animals in Nepal.</p>
        </div>
      </footer>
    </div>
  );
};

export default Mission;