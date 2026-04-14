import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./Mission.css";

const Mission: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="ms">

      {/* ── NAV ── */}
      <nav className="ms-nav">
        <div className="ms-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="ms-nav-paw" />
          <span>RESQALL</span>
        </div>
        <div className="ms-nav-links">
          <button className="ms-nav-link" onClick={() => navigate("/")}>Home</button>
          <button className="ms-nav-link" onClick={() => navigate("/about")}>About Us</button>
          <button className="ms-nav-link ms-nav-link-active" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="ms-nav-link" onClick={() => navigate("/contact")}>Contact</button>
          <button className="ms-nav-link" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="ms-btn ms-btn-amber" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="ms-hero">
        <div className="ms-hero-blob ms-hero-blob-tr" />
        <div className="ms-hero-blob ms-hero-blob-bl" />
        <div className="ms-hero-grain" />
        <div className="ms-hero-inner">
          <div className="ms-eyebrow">
            <Icon type="fa" name="FaPaw" size={13} className="ms-eyebrow-icon" />
            Our Purpose
          </div>
          <h1 className="ms-hero-headline">
            Our <em>Mission</em>
          </h1>
          <p className="ms-hero-quote">
            "To create a world where no animal suffers alone, and every rescue leads to a second chance."
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="ms-trust">
        {[
          { type: "fa", name: "FaBolt", label: "24/7 Emergency Response" },
          { type: "fa", name: "FaClock", label: "15-Min Avg Response" },
          { type: "fa", name: "FaHeart", label: "500+ Animals Saved" },
          { type: "fa", name: "FaUsers", label: "200+ Active Rangers" },
        ].map(({ type, name, label }) => (
          <div className="ms-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="ms-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* ── CORE MISSION ── */}
      <section className="ms-section ms-section-white">
        <div className="ms-section-inner">
          <div className="ms-section-header">
            <div className="ms-eyebrow">
              <Icon type="hi" name="HiTarget" size={14} className="ms-eyebrow-icon" />
              What We Do
            </div>
            <h2 className="ms-section-title">Our <em>Core Mission</em></h2>
          </div>
          <div className="ms-mission-statement">
            <p className="ms-mission-text">
              ResQAll is a volunteer-powered emergency response network dedicated to rescuing all animals in distress. 
              From street dogs and cats to injured birds, trapped cows, and wildlife – we respond to every creature in need. 
              We connect people who find animals in distress with trained rangers who can respond immediately.
            </p>
            <div className="ms-highlights">
              <div className="ms-highlight-card">
                <span className="ms-highlight-number">24/7</span>
                <span className="ms-highlight-text">Emergency Response</span>
              </div>
              <div className="ms-highlight-card">
                <span className="ms-highlight-number">15min</span>
                <span className="ms-highlight-text">Average Response</span>
              </div>
              <div className="ms-highlight-card">
                <span className="ms-highlight-number">500+</span>
                <span className="ms-highlight-text">Animals Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="ms-section ms-section-parchment">
        <div className="ms-section-inner">
          <div className="ms-section-header">
            <div className="ms-eyebrow">
              <Icon type="hi" name="HiSparkles" size={14} className="ms-eyebrow-icon" />
              Our Foundation
            </div>
            <h2 className="ms-section-title">Our <em>Pillars</em></h2>
            <p className="ms-section-sub">The principles that guide every rescue mission</p>
          </div>
          <div className="ms-pillars">
            {[
              { 
                num: "01", 
                title: "Rapid Response", 
                desc: "Every second counts when an animal is in distress. We ensure the fastest possible response to every emergency call, regardless of the species.",
                stat: "FaClock",
                statTxt: "15min avg response"
              },
              { 
                num: "02", 
                title: "Quality Care", 
                desc: "Partnering with veterinarians who treat all animals – from cats and dogs to cows, birds, and wildlife – providing the best medical care for every rescued creature.",
                stat: "FaHospital",
                statTxt: "50+ vet partners"
              },
              { 
                num: "03", 
                title: "Community Building", 
                desc: "Growing a network of trained volunteers across Nepal who are ready to help any animal in need, fostering a culture of compassion for all living beings.",
                stat: "FaUsers",
                statTxt: "200+ rangers"
              },
              { 
                num: "04", 
                title: "Education", 
                desc: "Teaching communities about animal welfare, prevention, and the importance of protecting all creatures – big and small, domestic and wild.",
                stat: "FaBook",
                statTxt: "1000+ people reached"
              },
            ].map(({ num, title, desc, stat, statTxt }) => (
              <div className="ms-pillar" key={title}>
                <div className="ms-pillar-number">{num}</div>
                <h3 className="ms-pillar-title">{title}</h3>
                <p className="ms-pillar-desc">{desc}</p>
                <div className="ms-pillar-stat">
                  <Icon type="fa" name={stat} size={13} />
                  {statTxt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="ms-impact">
        <div className="ms-impact-inner">
          <div className="ms-section-header ms-section-header-light">
            <div className="ms-eyebrow ms-eyebrow-light">
              <Icon type="fa" name="FaChartLine" size={13} className="ms-eyebrow-icon" />
              Our Impact
            </div>
            <h2 className="ms-section-title ms-section-title-light">Our <em>Impact</em></h2>
          </div>
          <div className="ms-impact-stats">
            <div className="ms-impact-card">
              <span className="ms-impact-number">500+</span>
              <span className="ms-impact-label">Animals Rescued</span>
            </div>
            <div className="ms-impact-card">
              <span className="ms-impact-number">200+</span>
              <span className="ms-impact-label">Active Rangers</span>
            </div>
            <div className="ms-impact-card">
              <span className="ms-impact-number">50+</span>
              <span className="ms-impact-label">Vet Partners</span>
            </div>
            <div className="ms-impact-card">
              <span className="ms-impact-number">24/7</span>
              <span className="ms-impact-label">Coverage</span>
            </div>
          </div>
          <div className="ms-impact-species">
            <p>We've helped:</p>
            <div className="ms-species-tags">
              <span className="ms-species-tag">🐕 Dogs</span>
              <span className="ms-species-tag">🐈 Cats</span>
              <span className="ms-species-tag">🐄 Cows</span>
              <span className="ms-species-tag">🐦 Birds</span>
              <span className="ms-species-tag">🐐 Goats</span>
              <span className="ms-species-tag">🐒 Wildlife</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="ms-section ms-section-white">
        <div className="ms-section-inner ms-vision">
          <div className="ms-vision-content">
            <div className="ms-eyebrow">
              <Icon type="hi" name="HiEye" size={14} className="ms-eyebrow-icon" />
              Looking Forward
            </div>
            <h2 className="ms-section-title">Our <em>Vision</em></h2>
            <p className="ms-vision-text">
              We envision a Nepal where every animal in distress – whether a street dog, a stray cat, an injured bird, 
              or a trapped cow – has someone to call. A country where animal welfare is a priority for all creatures, 
              and where communities work together to protect the most vulnerable among us.
            </p>
            <div className="ms-vision-quote">
              <Icon type="fa" name="FaQuoteLeft" size={24} className="ms-quote-icon" />
              <p>Building a nation of animal lovers, one rescue at a time – for all animals.</p>
            </div>
          </div>
          <div className="ms-vision-image">
            <div className="ms-vision-img-back" />
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Rescue team with animals"
              className="ms-vision-img"
            />
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="ms-cta-band">
        <div className="ms-cta-band-circle" />
        <h2 className="ms-cta-band-title">Be Part of the <em>Mission</em></h2>
        <p className="ms-cta-band-sub">Join us in making a difference for all animals. Every volunteer counts, every rescue matters.</p>
        <div className="ms-cta-band-row">
          <button className="ms-btn ms-btn-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaUserPlus" size={15} />
            Become a Ranger
          </button>
          <button className="ms-btn ms-btn-outline-white" onClick={() => navigate("/about")}>
            <Icon type="fa" name="FaInfoCircle" size={15} />
            Learn More
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ms-footer">
        <div className="ms-footer-grid">
          <div className="ms-footer-brand">
            <div className="ms-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="ms-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="ms-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="ms-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>
          <div className="ms-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {[["About Us", "/about"], ["Our Mission", "/mission"], ["Contact", "/contact"], ["FAQ", "/faq"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="ms-footer-col">
            <h4>Get Involved</h4>
            <ul>
              {[["Become a Ranger", "/login"], ["Report Animal", "/login"], ["Partner With Us", "/login"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="ms-footer-col">
            <h4>Emergency</h4>
            <div className="ms-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} /> 24/7 Hotline
            </div>
            <div className="ms-footer-number">1-800-RESQALL</div>
            <div className="ms-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} /> rescue@resqall.org
            </div>
            <button className="ms-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>
        <div className="ms-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="ms-footer-heart" />
          <span>for animal rescue in Nepal.</span>
        </div>
      </footer>
    </div>
  );
};

export default Mission;