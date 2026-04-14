import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./HeroPage.css";

const HeroPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="lp">

      {/* ── NAV ── */}
      <nav className={`lp-nav ${scrolled ? "lp-nav-scrolled" : ""}`}>
        <div className="lp-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="lp-nav-paw" />
          <span className="lp-nav-brand">RESQALL</span>
        </div>
        <div className="lp-nav-links">
          <button className="lp-nav-link" onClick={() => navigate("/about")}>About Us</button>
          <button className="lp-nav-link" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="lp-nav-link" onClick={() => navigate("/contact")}>Contact</button>
          <button className="lp-nav-link" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="lp-nav-cta" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-blob lp-hero-blob-tr" />
        <div className="lp-hero-blob lp-hero-blob-bl" />
        <div className="lp-hero-grain" />

        <div className="lp-hero-inner">

          {/* LEFT */}
          <div className="lp-hero-left">
            <div className="lp-eyebrow">
              <Icon type="hi" name="HiCheckBadge" size={15} className="lp-eyebrow-icon" />
              24 / 7 Response Network
            </div>

            <h1 className="lp-hero-headline">
              Rescue.<br />
              Rehabilitate.<br />
              <em>Protect.</em>
            </h1>

            <p className="lp-hero-sub">
              We respond to animals in distress. Report an animal in need and
              our volunteer rangers will spring into action — around the clock,
              every day.
            </p>

            <div className="lp-hero-actions">
              <button className="lp-btn lp-btn-amber" onClick={() => navigate("/login")}>
                <Icon type="fa" name="FaExclamationTriangle" size={14} />
                Report Emergency
              </button>
              <button className="lp-btn lp-btn-ghost" onClick={() => navigate("/mission")}>
                <Icon type="fi" name="FiInfo" size={15} />
                Our Mission
              </button>
            </div>

            <div className="lp-stats-strip">
              <div className="lp-stats-cell">
                <span className="lp-stats-num">500+</span>
                <span className="lp-stats-lbl">Rescues</span>
              </div>
              <div className="lp-stats-divider" />
              <div className="lp-stats-cell">
                <span className="lp-stats-num">200+</span>
                <span className="lp-stats-lbl">Rangers</span>
              </div>
              <div className="lp-stats-divider" />
              <div className="lp-stats-cell">
                <span className="lp-stats-num">24/7</span>
                <span className="lp-stats-lbl">Response</span>
              </div>
            </div>

            <div className="lp-hero-ranger-row">
              <span>Already a ranger?</span>
              <button className="lp-btn lp-btn-outline-sm" onClick={() => navigate("/login")}>
                <Icon type="fa" name="FaSignInAlt" size={13} />
                Sign In
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lp-hero-right">
            <div className="lp-img-card">
              <div className="lp-img-card-back" />
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Rescued animals"
                className="lp-img-card-img"
              />
              <div className="lp-badge lp-badge-tl">
                <Icon type="fa" name="FaShieldAlt" size={13} />
                Verified Rangers
              </div>
              <div className="lp-badge lp-badge-br">
                <Icon type="fa" name="FaClock" size={13} />
                15 min avg response
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="lp-trust">
        {[
          { type: "fa", name: "FaShieldAlt",   label: "Verified Rangers Only" },
          { type: "fa", name: "FaBolt",         label: "15-Minute Avg Response" },
          { type: "fa", name: "FaHandshake",    label: "50+ Vet Partners" },
          { type: "fa", name: "FaMapMarkerAlt", label: "GPS-Tracked Dispatch" },
        ].map(({ type, name, label }) => (
          <div className="lp-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="lp-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section id="mission" className="lp-section lp-section-white">
        <div className="lp-section-inner">
          <div className="lp-eyebrow">
            <Icon type="hi" name="HiSparkles" size={14} className="lp-eyebrow-icon" />
            What We Do
          </div>
          <h2 className="lp-section-title">How We <em>Respond</em></h2>
          <p className="lp-section-sub">Our rapid-response system saves lives every day.</p>

          <div className="lp-features">
            {[
              { type: "fa", name: "FaMobileAlt", title: "Report Animal",  desc: "Instantly report animals in distress with location and photos through our app." },
              { type: "fa", name: "FaAmbulance", title: "Rapid Dispatch", desc: "The nearest available ranger is alerted and dispatched immediately via GPS." },
              { type: "fa", name: "FaFirstAid",  title: "Emergency Care", desc: "On-site first aid and transport to our trusted veterinary partners." },
              { type: "fa", name: "FaHospital",  title: "Rehabilitation", desc: "Professional medical care and full recovery support until safe." },
            ].map(({ type, name, title, desc }) => (
              <div className="lp-feat" key={title}>
                <div className="lp-feat-icon-wrap">
                  <Icon type={type} name={name} size={22} />
                </div>
                <h3 className="lp-feat-title">{title}</h3>
                <p className="lp-feat-desc">{desc}</p>
                <button className="lp-feat-link" onClick={() => navigate("/login")}>
                  Get Started
                  <Icon type="fi" name="FiArrowRight" size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp-stats-dark">
        <div className="lp-stats-dark-inner">
          {[
            { type: "fa", name: "FaHeart",     num: "500+",  label: "Animals Rescued" },
            { type: "fa", name: "FaUsers",     num: "200+",  label: "Active Rangers" },
            { type: "fa", name: "FaHandshake", num: "50+",   label: "Vet Partners" },
            { type: "fa", name: "FaBolt",      num: "15min", label: "Avg Response" },
          ].map(({ type, name, num, label }) => (
            <div className="lp-stat-big" key={label}>
              <div className="lp-stat-big-icon">
                <Icon type={type} name={name} size={22} />
              </div>
              <span className="lp-stat-big-num">{num}</span>
              <span className="lp-stat-big-lbl">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="lp-section lp-section-parchment">
        <div className="lp-section-inner">
          <div className="lp-eyebrow">
            <Icon type="hi" name="HiListBullet" size={14} className="lp-eyebrow-icon" />
            Process
          </div>
          <h2 className="lp-section-title">How It <em>Works</em></h2>
          <p className="lp-section-sub">From emergency report to rescue in 4 simple steps.</p>

          <div className="lp-steps">
            {[
              { n: 1, type: "fa", name: "FaFileAlt",  title: "Report",  desc: "Submit the animal's location and condition through our app." },
              { n: 2, type: "fa", name: "FaBell",      title: "Alert",   desc: "Nearby rangers receive an instant push notification." },
              { n: 3, type: "fa", name: "FaRunning",   title: "Rescue",  desc: "Ranger dispatched to provide immediate emergency care." },
              { n: 4, type: "fa", name: "FaHeartbeat", title: "Recover", desc: "Animal receives veterinary treatment and rehabilitation." },
            ].map(({ n, type, name, title, desc }) => (
              <div className="lp-step" key={title}>
                <div className="lp-step-num">{n}</div>
                <div className="lp-step-icon">
                  <Icon type={type} name={name} size={20} />
                </div>
                <h3 className="lp-step-title">{title}</h3>
                <p className="lp-step-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div className="lp-how-cta">
            <button className="lp-btn lp-btn-forest" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaUserPlus" size={14} />
              Become a Ranger
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaSignInAlt" size={14} />
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="rangers" className="lp-section lp-section-white">
        <div className="lp-section-inner">
          <div className="lp-eyebrow">
            <Icon type="fa" name="FaQuoteLeft" size={13} className="lp-eyebrow-icon" />
            Stories
          </div>
          <h2 className="lp-section-title">Rescue <em>Stories</em></h2>
          <p className="lp-section-sub">Real stories from our rangers and the animals they've saved.</p>

          <div className="lp-tests">
            {[
              { type: "fa", name: "FaUser",        quote: "I reported an injured dog through the app, and within 10 minutes a ranger was there. Amazing response time!",   author: "Sarah, Reporter",      btn: "Join Now" },
              { type: "fa", name: "FaStar",        quote: "Being a ranger with ResQAll has given me purpose. Every rescue is a life saved.",                               author: "Mike, Ranger",         btn: "Become a Ranger" },
              { type: "fa", name: "FaStethoscope", quote: "The veterinary partnership program ensures every rescued animal gets the care they need.",                       author: "Dr. Chen, Vet Partner", btn: "Partner With Us" },
            ].map(({ type, name, quote, author, btn }) => (
              <div className="lp-test" key={author}>
                <div className="lp-test-icon-wrap">
                  <Icon type={type} name={name} size={18} />
                </div>
                <p className="lp-test-quote">"{quote}"</p>
                <div className="lp-test-author">— {author}</div>
                <button className="lp-btn lp-btn-outline-sm" onClick={() => navigate("/login")}>
                  {btn}
                  <Icon type="fi" name="FiArrowRight" size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="lp-cta-band">
        <div className="lp-cta-band-circle" />
        <h2 className="lp-cta-band-title">Ready to <em>Make a Difference?</em></h2>
        <p className="lp-cta-band-sub">Join our network of volunteer rangers and start saving lives today.</p>
        <div className="lp-cta-band-row">
          <button className="lp-btn lp-btn-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaUserPlus" size={15} />
            Become a Ranger
          </button>
          <button className="lp-btn lp-btn-outline-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaSignInAlt" size={15} />
            Sign In
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="lp-footer">
        <div className="lp-footer-grid">

          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="lp-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7 with verified rangers and trusted vet partners.</p>
            <div className="lp-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="lp-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>

          <div className="lp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigate("/about")}>About Us</button></li>
              <li><button onClick={() => navigate("/mission")}>Our Mission</button></li>
              <li><button onClick={() => navigate("/contact")}>Contact</button></li>
              <li><button onClick={() => navigate("/faq")}>FAQ</button></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Get Involved</h4>
            <ul>
              <li><button onClick={() => navigate("/login")}>Become a Ranger</button></li>
              <li><button onClick={() => navigate("/login")}>Report Animal</button></li>
              <li><button onClick={() => navigate("/login")}>Partner With Us</button></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Emergency Contact</h4>
            <div className="lp-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} />
              24/7 Hotline
            </div>
            <div className="lp-footer-number">1-800-RESQALL</div>
            <div className="lp-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} />
              rescue@resqall.org
            </div>
            <button className="lp-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="lp-footer-heart" />
          <span>for animal rescue.</span>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;