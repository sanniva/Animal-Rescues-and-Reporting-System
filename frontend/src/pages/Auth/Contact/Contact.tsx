import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./Contact.css";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="ct">

      {/* ── NAV ── */}
      <nav className="ct-nav">
        <div className="ct-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="ct-nav-paw" />
          <span>RESQALL</span>
        </div>
        <div className="ct-nav-links">
          <button className="ct-nav-link" onClick={() => navigate("/")}>Home</button>
          <button className="ct-nav-link" onClick={() => navigate("/about")}>About Us</button>
          <button className="ct-nav-link" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="ct-nav-link ct-nav-link-active">Contact</button>
          <button className="ct-nav-link" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="ct-btn ct-btn-amber" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero-blob ct-hero-blob-tr" />
        <div className="ct-hero-blob ct-hero-blob-bl" />
        <div className="ct-hero-grain" />
        <div className="ct-hero-inner">
          <div className="ct-eyebrow">
            <Icon type="fa" name="FaPhone" size={13} className="ct-eyebrow-icon" />
            Get in Touch
          </div>
          <h1 className="ct-hero-headline">
            Contact <em>Us</em>
          </h1>
          <p className="ct-hero-sub">
            Have questions? Want to get involved? Reach out to us anytime —
            we're here to help every animal and every person who cares about them.
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="ct-trust">
        {[
          { type: "fa", name: "FaBolt",      label: "24/7 Emergency Line" },
          { type: "fa", name: "FaClock",     label: "Reply Within 24hrs" },
          { type: "fa", name: "FaBuilding",  label: "Office in Kathmandu" },
          { type: "fa", name: "FaHandshake", label: "Always Here to Help" },
        ].map(({ type, name, label }) => (
          <div className="ct-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="ct-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* ── CONTACT GRID ── */}
      <section className="ct-section ct-section-white">
        <div className="ct-section-inner ct-grid">

          {/* LEFT — info cards */}
          <div className="ct-info">
            <div className="ct-eyebrow">
              <Icon type="hi" name="HiChatBubbleLeftRight" size={14} className="ct-eyebrow-icon" />
              Reach Out
            </div>
            <h2 className="ct-info-title">Let's <em>Talk</em></h2>

            {[
              {
                type: "fa", name: "FaPhone",
                title: "Emergency Hotline",
                lines: ["1-800-RESQALL", "(1-800-737-7255)"],
                note: { type: "fa", name: "FaMobileAlt", text: "Available 24/7 for emergencies" },
                highlight: true,
              },
              {
                type: "fa", name: "FaEnvelope",
                title: "Email Us",
                lines: ["rescue@resqall.org", "info@resqall.org"],
                note: { type: "fa", name: "FaClock", text: "We reply within 24 hours" },
                highlight: false,
              },
              {
                type: "fa", name: "FaMapMarkerAlt",
                title: "Visit Us",
                lines: ["123 Rescue Street", "Kathmandu, Nepal 44600"],
                note: { type: "fa", name: "FaBuilding", text: "Open Mon–Fri, 9am–5pm" },
                highlight: false,
              },
            ].map(({ type, name, title, lines, note, highlight }) => (
              <div className={`ct-info-card ${highlight ? "ct-info-card-highlight" : ""}`} key={title}>
                <div className="ct-info-card-icon-wrap">
                  <Icon type={type} name={name} size={22} />
                </div>
                <div className="ct-info-card-body">
                  <h3 className="ct-info-card-title">{title}</h3>
                  {lines.map(l => (
                    <p key={l} className={highlight && lines.indexOf(l) === 0 ? "ct-info-card-big" : "ct-info-card-line"}>{l}</p>
                  ))}
                  <div className="ct-info-card-note">
                    <Icon type={note.type} name={note.name} size={12} />
                    {note.text}
                  </div>
                </div>
              </div>
            ))}

            <div className="ct-socials">
              <h3 className="ct-socials-title">Follow Us</h3>
              <div className="ct-socials-row">
                {[
                  { type: "fa", name: "FaFacebook" },
                  { type: "fa", name: "FaInstagram" },
                  { type: "fa", name: "FaTwitter" },
                  { type: "fa", name: "FaYoutube" },
                ].map(({ type, name }) => (
                  <span className="ct-socials-icon" key={name}>
                    <Icon type={type} name={name} size={18} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — details panel */}
          <div className="ct-panel">
            <div className="ct-eyebrow">
              <Icon type="fa" name="FaEnvelopeOpenText" size={13} className="ct-eyebrow-icon" />
              Send a Message
            </div>
            <h2 className="ct-panel-title">Get in <em>Touch</em></h2>

            <p className="ct-panel-intro">
              Whether you have questions about volunteering, want to report an emergency,
              or are interested in partnering with us — our team is here to help.
            </p>

            {/* Emergency callout */}
            <div className="ct-emerg">
              <div className="ct-emerg-badge">
                <Icon type="fa" name="FaExclamationTriangle" size={13} />
                24/7 EMERGENCY
              </div>
              <div className="ct-emerg-number">1-800-RESQALL</div>
              <div className="ct-emerg-dial">Dial: 1-800-737-7255</div>
            </div>

            {/* Detail rows */}
            <div className="ct-details">
              {[
                { type: "fa", name: "FaEnvelope",      label: "Email",  value: "rescue@resqall.org" },
                { type: "fa", name: "FaPhone",          label: "Phone",  value: "1-800-RESQALL" },
                { type: "fa", name: "FaClock",          label: "Hours",  value: "24/7 Emergency" },
                { type: "fa", name: "FaBuilding",       label: "Office", value: "Mon–Fri, 9am–5pm" },
              ].map(({ type, name, label, value }) => (
                <div className="ct-detail" key={label}>
                  <span className="ct-detail-label">
                    <Icon type={type} name={name} size={13} />
                    {label}
                  </span>
                  <span className="ct-detail-value">{value}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="ct-address">
              <p className="ct-address-intro">
                <Icon type="fa" name="FaMapMarkerAlt" size={13} />
                Prefer to write? Send mail to:
              </p>
              <address className="ct-address-block">
                <strong>ResQAll Headquarters</strong><br />
                123 Rescue Street<br />
                Kathmandu, Nepal 44600
              </address>
            </div>

            <button className="ct-btn ct-btn-forest ct-panel-cta" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaUserPlus" size={14} />
              Become a Ranger
            </button>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="ct-section ct-section-parchment">
        <div className="ct-section-inner">
          <div className="ct-eyebrow" style={{ marginBottom: 24 }}>
            <Icon type="fa" name="FaMapMarkerAlt" size={13} className="ct-eyebrow-icon" />
            Find Us
          </div>
          <h2 className="ct-section-title">Our <em>Location</em></h2>
          <div className="ct-map">
            <iframe
              title="ResQAll Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.999734517!2d85.2239805!3d27.70893895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="ct-cta-band">
        <div className="ct-cta-band-circle" />
        <h2 className="ct-cta-band-title">Ready to <em>Make a Difference?</em></h2>
        <p className="ct-cta-band-sub">Join our network of volunteer rangers and start saving lives today.</p>
        <div className="ct-cta-band-row">
          <button className="ct-btn ct-btn-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaUserPlus" size={15} />
            Become a Ranger
          </button>
          <button className="ct-btn ct-btn-outline-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaSignInAlt" size={15} />
            Sign In
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ct-footer">
        <div className="ct-footer-grid">
          <div className="ct-footer-brand">
            <div className="ct-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="ct-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="ct-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="ct-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>
          <div className="ct-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {[["About Us", "/about"], ["Our Mission", "/mission"], ["Contact", "/contact"], ["FAQ", "/faq"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="ct-footer-col">
            <h4>Get Involved</h4>
            <ul>
              {[["Become a Ranger", "/login"], ["Report Animal", "/login"], ["Partner With Us", "/login"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="ct-footer-col">
            <h4>Emergency</h4>
            <div className="ct-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} /> 24/7 Hotline
            </div>
            <div className="ct-footer-number">1-800-RESQALL</div>
            <div className="ct-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} /> rescue@resqall.org
            </div>
            <button className="ct-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>
        <div className="ct-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="ct-footer-heart" />
          <span>for animal rescue in Nepal.</span>
        </div>
      </footer>
    </div>
  );
};

export default Contact;