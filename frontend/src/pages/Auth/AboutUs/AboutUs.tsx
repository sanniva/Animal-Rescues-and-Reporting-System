// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./AboutUs.css";

// const AboutUs: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="about-wrapper">
//       {/* Navigation */}
//       <nav className="about-nav">
//         <div className="nav-container">
//           <div className="nav-logo">
//             <span className="nav-logo-icon">🐾</span>
//             <span className="nav-logo-text">RESQALL</span>
//           </div>
//           <div className="nav-links">
//             <Link to="/">Home</Link>
//             <Link to="/about" className="active">About</Link>
//             <Link to="/mission">Mission</Link>
//             <Link to="/contact">Contact</Link>
//           </div>
//           <button className="nav-cta" onClick={() => navigate("/login")}>
//             Join Us
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="about-hero-new">
//         <div className="hero-new-container">
//           <div className="hero-new-content">
//             <span className="hero-new-tag">SINCE 2020</span>
//             <h1 className="hero-new-title">
//               We're on a mission to<br />
//               <span className="hero-new-highlight">save every animal</span>
//             </h1>
//             <p className="hero-new-text">
//               What started in Kathmandu has grown into Nepal's fastest growing 
//               animal rescue network. We're building a future where no animal 
//               suffers alone.
//             </p>
//             <div className="hero-new-stats">
//               <div className="hero-new-stat">
//                 <span className="hero-new-stat-number">500+</span>
//                 <span className="hero-new-stat-label">Rescues</span>
//               </div>
//               <div className="hero-new-stat">
//                 <span className="hero-new-stat-number">200+</span>
//                 <span className="hero-new-stat-label">Volunteers</span>
//               </div>
//               <div className="hero-new-stat">
//                 <span className="hero-new-stat-number">50+</span>
//                 <span className="hero-new-stat-label">Vet Partners</span>
//               </div>
//             </div>
//             <button className="hero-new-btn" onClick={() => navigate("/login")}>
//               Become a Ranger →
//             </button>
//           </div>
//           <div className="hero-new-image">
//             <div className="hero-new-image-grid">
//               <div className="grid-item grid-item-1"></div>
//               <div className="grid-item grid-item-2"></div>
//               <div className="grid-item grid-item-3"></div>
//               <div className="grid-item grid-item-4"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="story-new">
//         <div className="story-new-container">
//           <div className="story-new-header">
//             <span className="story-new-subtitle">OUR STORY</span>
//             <h2 className="story-new-title">
//               From a small idea to a<br />
//               <span>nationwide movement</span>
//             </h2>
//           </div>
//           <div className="story-new-content">
//             <div className="story-new-text">
//               <p>
//                 ResQAll began with five friends in Kathmandu who couldn't ignore 
//                 the animals suffering on the streets. What started as weekend 
//                 rescues quickly grew into a network of passionate volunteers.
//               </p>
//               <p>
//                 Today, we operate 24/7 across Nepal, with over 200 trained rangers 
//                 and 50 veterinary partners. Every day, we prove that compassion 
//                 and quick action can save lives.
//               </p>
//             </div>
//             <div className="story-new-stats">
//               <div className="story-new-stat-card">
//                 <span className="story-new-stat-number">2020</span>
//                 <span className="story-new-stat-label">Founded</span>
//               </div>
//               <div className="story-new-stat-card">
//                 <span className="story-new-stat-number">500+</span>
//                 <span className="story-new-stat-label">Lives Saved</span>
//               </div>
//               <div className="story-new-stat-card">
//                 <span className="story-new-stat-number">24/7</span>
//                 <span className="story-new-stat-label">Response</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="values-new">
//         <div className="values-new-container">
//           <div className="values-new-header">
//             <span className="values-new-subtitle">WHY WE DO IT</span>
//             <h2 className="values-new-title">
//               Our core <span>values</span>
//             </h2>
//           </div>
//           <div className="values-new-grid">
//             <div className="values-new-card">
//               <div className="values-new-icon">⚡</div>
//               <h3>Speed</h3>
//               <p>Every second counts. We respond in minutes, not hours.</p>
//               <div className="values-new-meta">15min average</div>
//             </div>
//             <div className="values-new-card">
//               <div className="values-new-icon">❤️</div>
//               <h3>Compassion</h3>
//               <p>Every animal deserves dignity and gentle care.</p>
//               <div className="values-new-meta">100% gentle</div>
//             </div>
//             <div className="values-new-card">
//               <div className="values-new-icon">🤝</div>
//               <h3>Community</h3>
//               <p>Together we're stronger. Our network saves lives.</p>
//               <div className="values-new-meta">200+ rangers</div>
//             </div>
//             <div className="values-new-card">
//               <div className="values-new-icon">🔍</div>
//               <h3>Transparency</h3>
//               <p>Clear communication in every rescue mission.</p>
//               <div className="values-new-meta">100% open</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="team-new">
//         <div className="team-new-container">
//           <div className="team-new-header">
//             <span className="team-new-subtitle">MEET THE TEAM</span>
//             <h2 className="team-new-title">
//               The people behind <span>the rescues</span>
//             </h2>
//           </div>
//           <div className="team-new-grid">
//             <div className="team-new-card">
//               <div className="team-new-image">
//                 <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Sarah" />
//               </div>
//               <div className="team-new-info">
//                 <h4>Sarah Johnson</h4>
//                 <p>Founder & Director</p>
//                 <span>15 years veterinary experience</span>
//               </div>
//             </div>
//             <div className="team-new-card">
//               <div className="team-new-image">
//                 <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Mike" />
//               </div>
//               <div className="team-new-info">
//                 <h4>Mike Chen</h4>
//                 <p>Operations Lead</p>
//                 <span>Former emergency responder</span>
//               </div>
//             </div>
//             <div className="team-new-card">
//               <div className="team-new-image">
//                 <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Priya" />
//               </div>
//               <div className="team-new-info">
//                 <h4>Priya Patel</h4>
//                 <p>Volunteer Coordinator</p>
//                 <span>Building ranger network</span>
//               </div>
//             </div>
//             <div className="team-new-card">
//               <div className="team-new-image">
//                 <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" alt="David" />
//               </div>
//               <div className="team-new-info">
//                 <h4>David Shrestha</h4>
//                 <p>Veterinary Lead</p>
//                 <span>50+ vet partners</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-new">
//         <div className="cta-new-container">
//           <h2 className="cta-new-title">
//             Ready to make a difference?
//           </h2>
//           <p className="cta-new-text">
//             Join our network of volunteers and start saving lives today.
//           </p>
//           <div className="cta-new-buttons">
//             <button className="cta-new-primary" onClick={() => navigate("/login")}>
//               Become a Ranger
//             </button>
//             <button className="cta-new-secondary" onClick={() => navigate("/contact")}>
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer-new">
//         <div className="footer-new-container">
//           <div className="footer-new-top">
//             <div className="footer-new-brand">
//               <div className="footer-new-logo">
//                 <span>🐾</span>
//                 <span>RESQALL</span>
//               </div>
//               <p>Saving lives across Nepal, 24 hours a day.</p>
//             </div>
//             <div className="footer-new-links">
//               <div className="footer-new-section">
//                 <h4>Explore</h4>
//                 <ul>
//                   <li><Link to="/about">About</Link></li>
//                   <li><Link to="/mission">Mission</Link></li>
//                   <li><Link to="/contact">Contact</Link></li>
//                 </ul>
//               </div>
//               <div className="footer-new-section">
//                 <h4>Join</h4>
//                 <ul>
//                   <li><Link to="/login">Become a Ranger</Link></li>
//                   <li><Link to="/login">Report Animal</Link></li>
//                   <li><Link to="/login">Partner</Link></li>
//                 </ul>
//               </div>
//               <div className="footer-new-section">
//                 <h4>Emergency</h4>
//                 <p className="footer-new-phone">1-800-RESQALL</p>
//                 <p>24/7 Hotline</p>
//               </div>
//             </div>
//           </div>
//           <div className="footer-new-bottom">
//             <p>© 2025 ResQAll. All rights reserved.</p>
//             <div className="footer-new-social">
//               <span>📱</span>
//               <span>📘</span>
//               <span>📷</span>
//               <span>🐦</span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutUs;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
              <span className="badge-icon">🐾</span>
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
              <span className="value-icon">⚡</span>
            </div>
            <h3 className="value-title">Speed</h3>
            <p className="value-description">
              Every second counts for every animal. We respond in minutes, not hours.
            </p>
            <div className="value-stat">⏱️ 15min average</div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <span className="value-icon">❤️</span>
            </div>
            <h3 className="value-title">Compassion</h3>
            <p className="value-description">
              Every animal – big or small, domestic or wild – deserves dignity and gentle care.
            </p>
            <div className="value-stat">🤲 100% gentle</div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <span className="value-icon">🤝</span>
            </div>
            <h3 className="value-title">Community</h3>
            <p className="value-description">
              Together we're stronger. Our network of volunteers saves all kinds of animals.
            </p>
            <div className="value-stat">👥 200+ rangers</div>
          </div>

          <div className="value-card">
            <div className="value-icon-wrapper">
              <span className="value-icon">🔍</span>
            </div>
            <h3 className="value-title">Transparency</h3>
            <p className="value-description">
              Clear communication in every rescue mission for every species.
            </p>
            <div className="value-stat">📋 100% open</div>
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

export default AboutUs;