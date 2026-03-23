// // src/pages/Hero/HeroPage.tsx
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Icon from '../../components/Icon';
// import './HeroPage.css';

// export const HeroPage: React.FC = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const stats = [
//     { number: '500+', label: 'Lives Saved', icon: '❤️' },
//     { number: '24/7', label: 'Emergency Response', icon: '🚨' },
//     { number: '100+', label: 'Active Rangers', icon: '🦸' },
//     { number: '50+', label: 'Partner Clinics', icon: '🏥' }
//   ];

//   const features = [
//     {
//       icon: '🚨',
//       title: 'Instant Reporting',
//       description: 'Report animal emergencies in seconds with our streamlined field report system.',
//       color: '#ef4444'
//     },
//     {
//       icon: '📍',
//       title: 'GPS Tracking',
//       description: 'Pinpoint exact locations for faster response times from our volunteer network.',
//       color: '#3b82f6'
//     },
//     {
//       icon: '📸',
//       title: 'Photo Evidence',
//       description: 'Upload photos to help volunteers assess situations before arriving on scene.',
//       color: '#10b981'
//     },
//     {
//       icon: '🤝',
//       title: 'Volunteer Network',
//       description: 'Join a community of dedicated rangers committed to animal rescue.',
//       color: '#f59e0b'
//     },
//     {
//       icon: '📊',
//       title: 'Real-time Tracking',
//       description: 'Follow rescue missions from report to successful completion.',
//       color: '#8b5cf6'
//     },
//     {
//       icon: '🏆',
//       title: 'Achievement System',
//       description: 'Earn badges and recognition for your rescue efforts.',
//       color: '#ec4899'
//     }
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Volunteer Ranger',
//       image: 'https://images.unsplash.com/photo-1494790108777-7666c199f9b7?w=150',
//       quote: 'Being part of ResQAll has given me purpose. Every rescue feels like a victory, and the community support is incredible.',
//       rescueCount: 47
//     },
//     {
//       name: 'Mike Chen',
//       role: 'Animal Welfare Officer',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
//       quote: 'The platform has revolutionized how we coordinate rescues. Response times have improved dramatically.',
//       rescueCount: 89
//     },
//     {
//       name: 'Priya Patel',
//       role: 'Veterinary Partner',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
//       quote: 'I\'ve seen countless animals get a second chance thanks to the quick action of ResQAll volunteers.',
//       rescueCount: 156
//     }
//   ];

//   const handleGetStarted = () => {
//     navigate('/register');
//   };

//   const handleLearnMore = () => {
//     const featuresSection = document.getElementById('features');
//     featuresSection?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="hero-wrapper">
//       {/* Animated Background */}
//       <div className="hero-background">
//         <div className="gradient-orb orb-1"></div>
//         <div className="gradient-orb orb-2"></div>
//         <div className="gradient-orb orb-3"></div>
//         <div className="pattern-overlay"></div>
//       </div>

//       {/* Navigation */}
//       <nav className={`hero-nav ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">
//           <div className="nav-logo">
//             <Icon type="fa" name="FaPaw" size={32} className="logo-icon" />
//             <span className="logo-text">ResQAll</span>
//           </div>
//           <div className="nav-links">
//             <Link to="/about" className="nav-link">About</Link>
//             <Link to="/how-it-works" className="nav-link">How It Works</Link>
//             <Link to="/contact" className="nav-link">Contact</Link>
//             <Link to="/login" className="nav-link login-link">Login</Link>
//             <Link to="/register" className="nav-link register-link">Join the Mission</Link>
//           </div>
//           <button className="mobile-menu-btn">
//             <Icon type="fa" name="FaBars" size={24} />
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-container">
//           <div className="hero-content">
//             <div className="hero-badge">
//               <span className="badge-pulse"></span>
//               <span>24/7 Emergency Response Network</span>
//             </div>
//             <h1 className="hero-title">
//               <span className="title-line">Every Paw Matters,</span>
//               <span className="title-line gradient-text">Every Life Counts</span>
//             </h1>
//             <p className="hero-description">
//               Join Nepal's fastest-growing animal rescue network. Report emergencies, 
//               volunteer your time, or support our mission to protect animals in need.
//             </p>
//             <div className="hero-cta">
//               <button onClick={handleGetStarted} className="cta-primary">
//                 <span>Start Saving Lives</span>
//                 <Icon type="fa" name="FaArrowRight" size={16} />
//               </button>
//               <button onClick={handleLearnMore} className="cta-secondary">
//                 <Icon type="fa" name="FaPlay" size={14} />
//                 <span>See How It Works</span>
//               </button>
//             </div>
//             <div className="hero-stats-mini">
//               <div className="stat-mini-item">
//                 <span className="stat-mini-number">500+</span>
//                 <span className="stat-mini-label">Rescues</span>
//               </div>
//               <div className="stat-mini-item">
//                 <span className="stat-mini-number">100+</span>
//                 <span className="stat-mini-label">Volunteers</span>
//               </div>
//               <div className="stat-mini-item">
//                 <span className="stat-mini-number">24/7</span>
//                 <span className="stat-mini-label">Response</span>
//               </div>
//             </div>
//           </div>
//           <div className="hero-image-container">
//             <div className="hero-image-wrapper">
//               <img 
//                 src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800" 
//                 alt="Happy rescued dog"
//                 className="hero-main-image"
//               />
//               <div className="image-badge badge-1">
//                 <Icon type="fa" name="FaHeart" />
//                 <span>500+ Saved</span>
//               </div>
//               <div className="image-badge badge-2">
//                 <Icon type="fa" name="FaClock" />
//                 <span>15 min avg response</span>
//               </div>
//               <div className="floating-paw paw-1">🐾</div>
//               <div className="floating-paw paw-2">🐾</div>
//               <div className="floating-paw paw-3">🐾</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="stats-section">
//         <div className="stats-container">
//           {stats.map((stat, index) => (
//             <div key={index} className="stat-card">
//               <div className="stat-icon">{stat.icon}</div>
//               <div className="stat-info">
//                 <span className="stat-number">{stat.number}</span>
//                 <span className="stat-label">{stat.label}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="features-section">
//         <div className="features-header">
//           <h2 className="section-title">
//             Everything You Need
//             <span className="title-accent"> to Make a Difference</span>
//           </h2>
//           <p className="section-subtitle">
//             Powerful tools designed for quick response and effective rescue coordination
//           </p>
//         </div>
//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div key={index} className="feature-card">
//               <div className="feature-icon-wrapper" style={{ background: `${feature.color}15` }}>
//                 <span className="feature-icon">{feature.icon}</span>
//               </div>
//               <h3 className="feature-title">{feature.title}</h3>
//               <p className="feature-description">{feature.description}</p>
//               <div className="feature-hover-glow" style={{ background: feature.color }}></div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="how-it-works-section">
//         <div className="how-container">
//           <h2 className="section-title white">How ResQAll Works</h2>
//           <p className="section-subtitle white">
//             From emergency report to successful rescue in four simple steps
//           </p>
//           <div className="steps-container">
//             <div className="step-item">
//               <div className="step-number">1</div>
//               <div className="step-content">
//                 <div className="step-icon">🚨</div>
//                 <h3>Report Emergency</h3>
//                 <p>File a field report with photos and location</p>
//               </div>
//               <div className="step-arrow">→</div>
//             </div>
//             <div className="step-item">
//               <div className="step-number">2</div>
//               <div className="step-content">
//                 <div className="step-icon">📋</div>
//                 <h3>Admin Assignment</h3>
//                 <p>Report is verified and assigned to nearest ranger</p>
//               </div>
//               <div className="step-arrow">→</div>
//             </div>
//             <div className="step-item">
//               <div className="step-number">3</div>
//               <div className="step-content">
//                 <div className="step-icon">🦸</div>
//                 <h3>Ranger Responds</h3>
//                 <p>Volunteer accepts mission and heads to location</p>
//               </div>
//               <div className="step-arrow">→</div>
//             </div>
//             <div className="step-item">
//               <div className="step-number">4</div>
//               <div className="step-content">
//                 <div className="step-icon">❤️</div>
//                 <h3>Rescue Complete</h3>
//                 <p>Animal is saved and case is closed with evidence</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h2 className="section-title">Trusted by Heroes Like You</h2>
//         <p className="section-subtitle">Join hundreds of volunteers making a difference every day</p>
//         <div className="testimonials-container">
//           {testimonials.map((testimonial, index) => (
//             <div 
//               key={index} 
//               className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
//               style={{ transform: `translateX(${(index - activeTestimonial) * 110}%)` }}
//             >
//               <div className="testimonial-image">
//                 <img src={testimonial.image} alt={testimonial.name} />
//               </div>
//               <div className="testimonial-content">
//                 <div className="testimonial-quote">"</div>
//                 <p className="testimonial-text">{testimonial.quote}</p>
//                 <div className="testimonial-author">
//                   <strong>{testimonial.name}</strong>
//                   <span>{testimonial.role}</span>
//                 </div>
//                 <div className="testimonial-rescues">
//                   <Icon type="fa" name="FaPaw" size={14} />
//                   <span>{testimonial.rescueCount} rescues</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="testimonial-dots">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`dot ${index === activeTestimonial ? 'active' : ''}`}
//                 onClick={() => setActiveTestimonial(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="cta-container">
//           <div className="cta-content">
//             <h2>Ready to Join the Mission?</h2>
//             <p>Every minute counts. Sign up now and become part of the rescue network.</p>
//             <div className="cta-buttons">
//               <Link to="/register" className="cta-primary large">
//                 Become a Ranger
//                 <Icon type="fa" name="FaArrowRight" size={16} />
//               </Link>
//               <Link to="/about" className="cta-outline">
//                 Learn More
//               </Link>
//             </div>
//           </div>
//           <div className="cta-image">
//             <img 
//               src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600" 
//               alt="Happy volunteers with rescued dog"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="hero-footer">
//         <div className="footer-container">
//           <div className="footer-grid">
//             <div className="footer-brand">
//               <Icon type="fa" name="FaPaw" size={32} className="footer-logo" />
//               <h3>ResQAll Network</h3>
//               <p>Protecting every paw on the street, one rescue at a time.</p>
//               <div className="social-links">
//                 <a href="#"><Icon type="fa" name="FaFacebook" /></a>
//                 <a href="#"><Icon type="fa" name="FaTwitter" /></a>
//                 <a href="#"><Icon type="fa" name="FaInstagram" /></a>
//                 <a href="#"><Icon type="fa" name="FaYoutube" /></a>
//               </div>
//             </div>
//             <div className="footer-links">
//               <h4>Quick Links</h4>
//               <ul>
//                 <li><Link to="/about">About Us</Link></li>
//                 <li><Link to="/how-it-works">How It Works</Link></li>
//                 <li><Link to="/volunteer">Become a Ranger</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//               </ul>
//             </div>
//             <div className="footer-links">
//               <h4>Resources</h4>
//               <ul>
//                 <li><Link to="/blog">Blog</Link></li>
//                 <li><Link to="/faq">FAQ</Link></li>
//                 <li><Link to="/privacy">Privacy Policy</Link></li>
//                 <li><Link to="/terms">Terms of Service</Link></li>
//               </ul>
//             </div>
//             <div className="footer-newsletter">
//               <h4>Stay Updated</h4>
//               <p>Get rescue stories and updates in your inbox</p>
//               <form className="newsletter-form">
//                 <input type="email" placeholder="Enter your email" />
//                 <button type="submit">Subscribe</button>
//               </form>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>&copy; 2026 ResQAll Network. All rights reserved. Made with ❤️ for animals.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./HeroPage.css";

// const HeroPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="hero">
//       {/* Background Shapes */}
//       <div className="bg-shape bg-shape-top"></div>
//       <div className="bg-shape bg-shape-bottom"></div>
//       <div className="bg-circle-right"></div>
//       <div className="bg-circle-left"></div>
//       <div className="bg-wave"></div>

//       <div className="hero-content">
//         <div className="left">
//           <div className="logo-badge">
//             <span className="logo-icon">🐾</span>
//             <span className="logo-text">ResQAll</span>
//           </div>

//           <h1>
//             Rescue. <br />
//             Rehabilitate. <br />
//             <span>Rehome.</span>
//           </h1>

//           <p>
//             We give abandoned animals a second chance at life.
//             Join our mission and make a difference today.
//           </p>

//           <div className="buttons">
//             <button 
//               className="btn-primary" 
//               onClick={() => navigate("/report")}
//             >
//               Report an Animal
//             </button>
//             <button 
//               className="btn-outline" 
//               onClick={() => navigate("/about")}
//             >
//               Our Mission
//             </button>
//           </div>

//           <div className="stats-badge">
//             <div className="stat-item">
//               <span className="stat-number">500+</span>
//               <span className="stat-label">Rescues</span>
//             </div>
//             <div className="stat-divider"></div>
//             <div className="stat-item">
//               <span className="stat-number">200+</span>
//               <span className="stat-label">Volunteers</span>
//             </div>
//             <div className="stat-divider"></div>
//             <div className="stat-item">
//               <span className="stat-number">50+</span>
//               <span className="stat-label">Partners</span>
//             </div>
//           </div>

//           <div className="login-prompt">
//             <span className="login-text">Already a member?</span>
//             <button 
//               className="btn-login" 
//               onClick={() => navigate("/login")}
//             >
//               Sign In
//             </button>
//           </div>
//         </div>

//         <div className="right">
//           <div className="image-frame">
//             <img
//               src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//               alt="Rescued Dog and Cat together"
//             />
//             <div className="image-badge">
//               <span className="badge-icon">🆘</span>
//               <span>Emergency Response</span>
//             </div>
//             <div className="image-badge-secondary">
//               <span className="badge-icon">24/7</span>
//               <span>Rescue Hotline</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroPage.css";

const HeroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        {/* Background Shapes */}
        <div className="bg-shape bg-shape-top"></div>
        <div className="bg-shape bg-shape-bottom"></div>
        <div className="bg-circle-right"></div>
        <div className="bg-circle-left"></div>
        <div className="bg-wave"></div>

        <div className="hero-content">
          <div className="left">
            <div className="logo-badge">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">RESQALL</span>
            </div>

            <h1>
              Rescue. <br />
              Rehabilitate. <br />
              <span>Protect.</span>
            </h1>

            <p>
              We respond to animals in distress. Report an animal in need and our 
              volunteer rangers will spring into action.
            </p>

            <div className="buttons">
              <button 
                className="btn-primary btn-emergency" 
                onClick={() => navigate("/login")}
              >
                🚨 Report Emergency
              </button>
              <button 
                className="btn-outline" 
                onClick={() => navigate("/login")}
              >
                Our Mission
              </button>
            </div>

            <div className="stats-badge">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Rescues</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Rangers</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Response</span>
              </div>
            </div>

            <div className="login-prompt">
              <span className="login-text">Already a ranger?</span>
              <button 
                className="btn-login" 
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="right">
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Rescue animals"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-bg-wave"></div>
        <div className="section-bg-circle"></div>
        <div className="section-header">
          <h2>How We <span>Respond</span></h2>
          <p>Our rapid response system saves lives every day</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Report Animal</h3>
            <p>Use our app to instantly report animals in distress with location and photos</p>
            <button className="feature-btn" onClick={() => navigate("/login")}>Get Started →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚑</div>
            <h3>Rapid Dispatch</h3>
            <p>Nearest available ranger is alerted and dispatched immediately</p>
            <button className="feature-btn" onClick={() => navigate("/login")}>Learn More →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🆘</div>
            <h3>Emergency Care</h3>
            <p>On-site first aid and transportation to veterinary partners</p>
            <button className="feature-btn" onClick={() => navigate("/login")}>Our Process →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Rehabilitation</h3>
            <p>Professional medical care and recovery support</p>
            <button className="feature-btn" onClick={() => navigate("/login")}>Our Partners →</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-bg-wave"></div>
        <div className="stats-bg-circle"></div>
        <div className="stats-container">
          <div className="stat-large">
            <span className="stat-large-number">500+</span>
            <span className="stat-large-label">Animals Rescued</span>
          </div>
          <div className="stat-large">
            <span className="stat-large-number">200+</span>
            <span className="stat-large-label">Active Rangers</span>
          </div>
          <div className="stat-large">
            <span className="stat-large-number">50+</span>
            <span className="stat-large-label">Vet Partners</span>
          </div>
          <div className="stat-large">
            <span className="stat-large-number">15min</span>
            <span className="stat-large-label">Avg Response</span>
          </div>
        </div>
      </section>

      {/* How It Works Section - ALL 4 STEPS IN ONE LINE */}
      <section className="how-it-works">
        <div className="section-bg-wave light"></div>
        <div className="section-bg-circle light"></div>
        <div className="section-header">
          <h2>How It <span>Works</span></h2>
          <p>From emergency report to rescue in 4 simple steps</p>
        </div>

        <div className="steps-row">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Report</h3>
            <p>Submit animal location and condition through our app</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Alert</h3>
            <p>Nearby rangers receive instant notification</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Rescue</h3>
            <p>Ranger dispatched to provide emergency care</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">4</div>
            <h3>Recover</h3>
            <p>Animal receives veterinary treatment and rehabilitation</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Become a Ranger
          </button>
          <button className="btn-outline" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-bg-wave"></div>
        <div className="section-bg-circle"></div>
        <div className="section-header">
          <h2>Rescue <span>Stories</span></h2>
          <p>Real stories from our rangers and the animals they've saved</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"I reported an injured dog through the app, and within 10 minutes a ranger was there. Amazing response time!"</p>
            <div className="testimonial-author">
              <strong>- Sarah, Reporter</strong>
            </div>
            <button className="testimonial-btn" onClick={() => navigate("/login")}>Join Now →</button>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"Being a ranger with ResQAll has given me purpose. Every rescue is a life saved."</p>
            <div className="testimonial-author">
              <strong>- Mike, Ranger</strong>
            </div>
            <button className="testimonial-btn" onClick={() => navigate("/login")}>Become a Ranger →</button>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"The veterinary partnership program ensures every rescued animal gets the care they need."</p>
            <div className="testimonial-author">
              <strong>- Dr. Chen, Vet Partner</strong>
            </div>
            <button className="testimonial-btn" onClick={() => navigate("/login")}>Partner With Us →</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-wave"></div>
        <div className="cta-bg-circle"></div>
        <div className="cta-content">
          <h2>Ready to <span>Make a Difference?</span></h2>
          <p>Join our network of volunteer rangers and start saving lives today.</p>
          <div className="cta-buttons-large">
            <button className="btn-primary btn-large" onClick={() => navigate("/login")}>
              Become a Ranger
            </button>
            <button className="btn-outline btn-large" onClick={() => navigate("/login")}>
              Sign In
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
            <p>Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="footer-social">
              <span className="social-icon">📱</span>
              <span className="social-icon">📘</span>
              <span className="social-icon">📷</span>
              <span className="social-icon">🐦</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigate("/about")}>About Us</button></li>
              <li><button onClick={() => navigate("/mission")}>Our Mission</button></li>
              <li><button onClick={() => navigate("/contact")}>Contact</button></li>
              <li><button onClick={() => navigate("/faq")}>FAQ</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul>
              <li><button onClick={() => navigate("/login")}>Become a Ranger</button></li>
              <li><button onClick={() => navigate("/login")}>Report Animal</button></li>
              <li><button onClick={() => navigate("/login")}>Partner With Us</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Emergency Contact</h4>
            <p className="emergency-phone">📞 24/7 Hotline</p>
            <p className="emergency-number">1-800-RESQALL</p>
            <p className="footer-email">📧 rescue@resqall.org</p>
            <button className="footer-emergency-btn" onClick={() => navigate("/login")}>
              🚨 Report Emergency
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 ResQAll. All rights reserved. Made with ❤️ for animal rescue.</p>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;

