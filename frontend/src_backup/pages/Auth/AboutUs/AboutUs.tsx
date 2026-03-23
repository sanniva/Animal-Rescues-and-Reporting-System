import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon"; // Adjust the import path as needed
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-top"></div>
      <div className="bg-shape bg-shape-bottom"></div>
      <div className="bg-circle-right"></div>
      <div className="bg-circle-left"></div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <div className="section-badge">
              <span className="badge-icon">
                <Icon type="fa" name="FaPaw" size={16} />
              </span>
              <span>About ResQAll</span>
            </div>
            <h1 className="hero-title">
              We're on a mission to<br />
              <span className="highlight">save every animal</span>
            </h1>
            <p className="hero-description">
              From street dogs and cats to injured birds, trapped cows, and wildlife – 
              we respond to every creature in need. What started in Kathmandu has grown 
              into Nepal's fastest growing animal rescue network.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Animals Saved</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">200+</span>
                <span className="hero-stat-label">Active Rangers</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">50+</span>
                <span className="hero-stat-label">Vet Partners</span>
              </div>
            </div>
          </div>
          <div className="about-hero-image">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Rescue team with animals"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Rescued animals"
            />
          </div>
          <div className="story-content">
            <div className="section-header-left">
              <span className="section-subtitle">OUR STORY</span>
              <h2 className="section-title">
                From a small idea to a<br />
                <span className="highlight">nationwide movement</span>
              </h2>
            </div>
            <p className="story-text">
              ResQAll began with five friends in Kathmandu who couldn't ignore 
              the animals suffering on the streets – dogs, cats, cows, and birds alike. 
              What started as weekend rescues quickly grew into a network of passionate 
              volunteers dedicated to helping all creatures.
            </p>
            <p className="story-text">
              Today, we operate 24/7 across Nepal, with over 200 trained rangers 
              and 50 veterinary partners. From injured street dogs to trapped wildlife, 
              from sick cows to orphaned birds – we're here for every animal in need.
            </p>
            <div className="story-milestones">
              <div className="milestone">
                <span className="milestone-year">2020</span>
                <span className="milestone-desc">First Rescue</span>
              </div>
              <div className="milestone">
                <span className="milestone-year">2022</span>
                <span className="milestone-desc">100th Rescue</span>
              </div>
              <div className="milestone">
                <span className="milestone-year">2024</span>
                <span className="milestone-desc">500th Rescue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-header-center">
          <span className="section-subtitle">WHY WE DO IT</span>
          <h2 className="section-title">
            Our core <span className="highlight">values</span>
          </h2>
          <p className="section-description">The principles that guide every rescue mission for every animal</p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-wrapper">
              <Icon type="fa" name="FaBolt" size={32} className="value-icon" />
            </div>
            <h3 className="value-title">Speed</h3>
            <p className="value-description">
              Every second counts for every animal. We respond in minutes, not hours.
            </p>
            <div className="value-stat">
              <Icon type="fa" name="FaClock" size={14} /> 15min average
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <Icon type="fa" name="FaHeart" size={32} className="value-icon" />
            </div>
            <h3 className="value-title">Compassion</h3>
            <p className="value-description">
              Every animal – big or small, domestic or wild – deserves dignity and gentle care.
            </p>
            <div className="value-stat">
              <Icon type="fa" name="FaHandsHelping" size={14} /> 100% gentle
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <Icon type="fa" name="FaHandshake" size={32} className="value-icon" />
            </div>
            <h3 className="value-title">Community</h3>
            <p className="value-description">
              Together we're stronger. Our network of volunteers saves all kinds of animals.
            </p>
            <div className="value-stat">
              <Icon type="fa" name="FaUsers" size={14} /> 200+ rangers
            </div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <Icon type="fa" name="FaSearch" size={32} className="value-icon" />
            </div>
            <h3 className="value-title">Transparency</h3>
            <p className="value-description">
              Clear communication in every rescue mission for every species.
            </p>
            <div className="value-stat">
              <Icon type="fa" name="FaFileAlt" size={14} /> 100% open
            </div>
          </div>
        </div>
      </section>

      {/* Species Section */}
      <section className="species-section">
        <div className="section-header-center">
          <span className="section-subtitle">WHO WE HELP</span>
          <h2 className="section-title">
            Every animal <span className="highlight">matters</span>
          </h2>
          <p className="section-description">We rescue all animals in need, regardless of species</p>
        </div>

        <div className="species-grid">
          <div className="species-card">
            <span className="species-icon">🐕</span>
            <h3>Dogs</h3>
            <p>Street dogs, injured dogs, puppies</p>
          </div>
          <div className="species-card">
            <span className="species-icon">🐈</span>
            <h3>Cats</h3>
            <p>Stray cats, kittens, injured felines</p>
          </div>
          <div className="species-card">
            <span className="species-icon">🐄</span>
            <h3>Cows</h3>
            <p>Trapped cows, sick cattle, calves</p>
          </div>
          <div className="species-card">
            <span className="species-icon">🐦</span>
            <h3>Birds</h3>
            <p>Injured birds, fallen nestlings</p>
          </div>
          <div className="species-card">
            <span className="species-icon">🐐</span>
            <h3>Goats</h3>
            <p>Injured goats, trapped livestock</p>
          </div>
          <div className="species-card">
            <span className="species-icon">🦊</span>
            <h3>Wildlife</h3>
            <p>Monkeys, civets, and other wild animals</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header-center">
          <span className="section-subtitle">MEET THE TEAM</span>
          <h2 className="section-title">
            The people behind <span className="highlight">the rescues</span>
          </h2>
          <p className="section-description">Dedicated individuals working tirelessly to save all animals</p>
        </div>

        <div className="team-grid">
          <div className="team-card">
            <div className="team-image-wrapper">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Sarah Johnson"
                className="team-image"
              />
            </div>
            <div className="team-info">
              <h3 className="team-name">Sarah Johnson</h3>
              <p className="team-role">Founder & Director</p>
              <p className="team-bio">15 years veterinary experience with all species</p>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image-wrapper">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Mike Chen"
                className="team-image"
              />
            </div>
            <div className="team-info">
              <h3 className="team-name">Mike Chen</h3>
              <p className="team-role">Operations Lead</p>
              <p className="team-bio">Former emergency responder, expert in animal rescue</p>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image-wrapper">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Priya Patel"
                className="team-image"
              />
            </div>
            <div className="team-info">
              <h3 className="team-name">Priya Patel</h3>
              <p className="team-role">Volunteer Coordinator</p>
              <p className="team-bio">Building ranger network across Nepal</p>
            </div>
          </div>

          <div className="team-card">
            <div className="team-image-wrapper">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="David Shrestha"
                className="team-image"
              />
            </div>
            <div className="team-info">
              <h3 className="team-name">David Shrestha</h3>
              <p className="team-role">Veterinary Lead</p>
              <p className="team-bio">Leading 50+ vet partners for all animals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to make a <span className="highlight">difference?</span>
          </h2>
          <p className="cta-description">
            Join our network of volunteers and start saving lives today. Every animal deserves a chance.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate("/login")}>
              Become a Ranger
            </button>
            <button className="btn-outline btn-large" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Updated to match Contact page footer exactly */}
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
              <li><Link to="/login">Report an Animal</Link></li>
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

export default AboutUs;