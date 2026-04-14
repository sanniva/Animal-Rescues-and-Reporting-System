import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="au">

      {/* ── NAV ── */}
      <nav className="au-nav">
        <div className="au-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="au-nav-paw" />
          <span>RESQALL</span>
        </div>
        <div className="au-nav-links">
          <button className="au-nav-link" onClick={() => navigate("/")}>Home</button>
          <button className="au-nav-link au-nav-link-active">About Us</button>
          <button className="au-nav-link" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="au-nav-link" onClick={() => navigate("/contact")}>Contact</button>
          <button className="au-nav-link" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="au-btn au-btn-amber" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="au-hero">
        <div className="au-hero-blob au-hero-blob-tr" />
        <div className="au-hero-blob au-hero-blob-bl" />
        <div className="au-hero-grain" />

        <div className="au-hero-inner">
          <div className="au-hero-left">
            <div className="au-eyebrow">
              <Icon type="fa" name="FaPaw" size={13} className="au-eyebrow-icon" />
              About ResQAll
            </div>
            <h1 className="au-hero-headline">
              We're on a mission to<br />
              <em>save every animal</em>
            </h1>
            <p className="au-hero-sub">
              From street dogs and cats to injured birds, trapped cows, and wildlife —
              we respond to every creature in need. What started in Kathmandu has grown
              into Nepal's fastest growing animal rescue network.
            </p>
            <div className="au-stats-strip">
              <div className="au-stats-cell">
                <span className="au-stats-num">500+</span>
                <span className="au-stats-lbl">Animals Saved</span>
              </div>
              <div className="au-stats-divider" />
              <div className="au-stats-cell">
                <span className="au-stats-num">200+</span>
                <span className="au-stats-lbl">Active Rangers</span>
              </div>
              <div className="au-stats-divider" />
              <div className="au-stats-cell">
                <span className="au-stats-num">50+</span>
                <span className="au-stats-lbl">Vet Partners</span>
              </div>
            </div>
          </div>

          <div className="au-hero-right">
            <div className="au-img-card">
              <div className="au-img-card-back" />
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Rescue team with animals"
                className="au-img-card-img"
              />
              <div className="au-badge au-badge-tl">
                <Icon type="fa" name="FaMapMarkerAlt" size={13} />
                Based in Kathmandu
              </div>
              <div className="au-badge au-badge-br">
                <Icon type="fa" name="FaHeart" size={13} />
                Since 2020
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="au-trust">
        {[
          { type: "fa", name: "FaShieldAlt",   label: "Verified Rangers Only" },
          { type: "fa", name: "FaBolt",         label: "15-Min Avg Response" },
          { type: "fa", name: "FaHandshake",    label: "50+ Vet Partners" },
          { type: "fa", name: "FaMapMarkerAlt", label: "Across Nepal" },
        ].map(({ type, name, label }) => (
          <div className="au-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="au-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* ── STORY ── */}
      <section className="au-section au-section-white">
        <div className="au-section-inner au-story">
          <div className="au-story-img-wrap">
            <div className="au-story-img-back" />
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Rescued animals"
              className="au-story-img"
            />
          </div>
          <div className="au-story-content">
            <div className="au-eyebrow">
              <Icon type="hi" name="HiBookOpen" size={14} className="au-eyebrow-icon" />
              Our Story
            </div>
            <h2 className="au-section-title">
              From a small idea to a<br /><em>nationwide movement</em>
            </h2>
            <p className="au-story-text">
              ResQAll began with five friends in Kathmandu who couldn't ignore
              the animals suffering on the streets. What started as weekend rescues
              quickly grew into a network of passionate volunteers dedicated to
              helping all creatures.
            </p>
            <p className="au-story-text">
              Today we operate 24/7 across Nepal, with over 200 trained rangers
              and 50 veterinary partners. From injured street dogs to trapped wildlife,
              from sick cows to orphaned birds — we're here for every animal in need.
            </p>
            <div className="au-milestones">
              {[
                { year: "2020", desc: "First Rescue" },
                { year: "2022", desc: "100th Rescue" },
                { year: "2024", desc: "500th Rescue" },
              ].map(({ year, desc }) => (
                <div className="au-milestone" key={year}>
                  <span className="au-milestone-year">{year}</span>
                  <span className="au-milestone-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="au-section au-section-parchment">
        <div className="au-section-inner">
          <div className="au-section-header">
            <div className="au-eyebrow">
              <Icon type="hi" name="HiSparkles" size={14} className="au-eyebrow-icon" />
              Why We Do It
            </div>
            <h2 className="au-section-title">Our core <em>values</em></h2>
            <p className="au-section-sub">The principles that guide every rescue mission</p>
          </div>
          <div className="au-values">
            {[
              { type: "fa", name: "FaBolt",      title: "Speed",         desc: "Every second counts. We respond in minutes, not hours.", stat: "FaClock",        statTxt: "15min average" },
              { type: "fa", name: "FaHeart",     title: "Compassion",    desc: "Every animal — big or small — deserves dignity and gentle care.", stat: "FaHandsHelping", statTxt: "100% gentle" },
              { type: "fa", name: "FaHandshake", title: "Community",     desc: "Together we're stronger. Our volunteer network saves all kinds of animals.", stat: "FaUsers",        statTxt: "200+ rangers" },
              { type: "fa", name: "FaSearch",    title: "Transparency",  desc: "Clear communication in every rescue mission for every species.", stat: "FaFileAlt",     statTxt: "100% open" },
            ].map(({ type, name, title, desc, stat, statTxt }) => (
              <div className="au-value" key={title}>
                <div className="au-value-icon-wrap">
                  <Icon type={type} name={name} size={24} />
                </div>
                <h3 className="au-value-title">{title}</h3>
                <p className="au-value-desc">{desc}</p>
                <div className="au-value-stat">
                  <Icon type="fa" name={stat} size={13} />
                  {statTxt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="au-section au-section-white">
        <div className="au-section-inner">
          <div className="au-section-header">
            <div className="au-eyebrow">
              <Icon type="fa" name="FaPaw" size={13} className="au-eyebrow-icon" />
              Who We Help
            </div>
            <h2 className="au-section-title">Every animal <em>matters</em></h2>
            <p className="au-section-sub">We rescue all animals in need, regardless of species</p>
          </div>
          <div className="au-species">
            {[
              { type: "gi", name: "GiDogBowl",    title: "Dogs",    desc: "Street dogs, injured dogs, puppies" },
              { type: "gi", name: "GiCat",         title: "Cats",    desc: "Stray cats, kittens, injured felines" },
              { type: "gi", name: "GiCow",         title: "Cows",    desc: "Trapped cows, sick cattle, calves" },
              { type: "gi", name: "GiBird",        title: "Birds",   desc: "Injured birds, fallen nestlings" },
              { type: "gi", name: "GiGoat",        title: "Goats",   desc: "Injured goats, trapped livestock" },
              { type: "gi", name: "GiFox",         title: "Wildlife", desc: "Monkeys, civets, and other wild animals" },
            ].map(({ type, name, title, desc }) => (
              <div className="au-species-card" key={title}>
                <div className="au-species-card-icon">
                  <Icon type={type} name={name} size={32} />
                </div>
                <h3 className="au-species-card-title">{title}</h3>
                <p className="au-species-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="au-section au-section-parchment" id="rangers">
        <div className="au-section-inner">
          <div className="au-section-header">
            <div className="au-eyebrow">
              <Icon type="fa" name="FaUsers" size={13} className="au-eyebrow-icon" />
              Meet The Team
            </div>
            <h2 className="au-section-title">The people behind <em>the rescues</em></h2>
            <p className="au-section-sub">Dedicated individuals working tirelessly to save all animals</p>
          </div>
          <div className="au-team">
            {[
              { img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",  name: "Sarah Johnson",  role: "Founder & Director",     bio: "15 years veterinary experience with all species" },
              { img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", name: "Mike Chen",       role: "Operations Lead",        bio: "Former emergency responder, expert in animal rescue" },
              { img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400", name: "Priya Patel",     role: "Volunteer Coordinator",  bio: "Building ranger network across Nepal" },
              { img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",   name: "David Shrestha", role: "Veterinary Lead",        bio: "Leading 50+ vet partners for all animals" },
            ].map(({ img, name, role, bio }) => (
              <div className="au-team-card" key={name}>
                <div className="au-team-card-img-wrap">
                  <img src={img} alt={name} className="au-team-card-img" />
                </div>
                <div className="au-team-card-info">
                  <h3 className="au-team-card-name">{name}</h3>
                  <p className="au-team-card-role">{role}</p>
                  <p className="au-team-card-bio">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="au-cta-band">
        <div className="au-cta-band-circle" />
        <h2 className="au-cta-band-title">Ready to <em>make a difference?</em></h2>
        <p className="au-cta-band-sub">Join our network of volunteers and start saving lives today.</p>
        <div className="au-cta-band-row">
          <button className="au-btn au-btn-white" onClick={() => navigate("/login")}>
            <Icon type="fa" name="FaUserPlus" size={15} />
            Become a Ranger
          </button>
          <button className="au-btn au-btn-outline-white" onClick={() => navigate("/contact")}>
            <Icon type="fa" name="FaEnvelope" size={15} />
            Contact Us
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="au-footer" id="contact">
        <div className="au-footer-grid">
          <div className="au-footer-brand">
            <div className="au-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="au-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="au-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="au-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>
          <div className="au-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {[["About Us", "/about"], ["Our Mission", "/mission"], ["Contact", "/contact"], ["FAQ", "/faq"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="au-footer-col">
            <h4>Get Involved</h4>
            <ul>
              {[["Become a Ranger", "/login"], ["Report Animal", "/login"], ["Partner With Us", "/login"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="au-footer-col">
            <h4>Emergency</h4>
            <div className="au-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} /> 24/7 Hotline
            </div>
            <div className="au-footer-number">1-800-RESQALL</div>
            <div className="au-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} /> rescue@resqall.org
            </div>
            <button className="au-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>
        <div className="au-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="au-footer-heart" />
          <span>for animal rescue in Nepal.</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;