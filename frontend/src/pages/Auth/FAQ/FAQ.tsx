import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import "./FAQ.css";

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is ResQAll?",
          a: "ResQAll is a volunteer-powered emergency response network dedicated to rescuing all animals in distress – dogs, cats, cows, birds, wildlife, and more. We connect people who find animals in need with trained rangers who can respond immediately."
        },
        {
          q: "Is ResQAll available nationwide?",
          a: "We are currently operating in major cities across Nepal including Kathmandu, Pokhara, and Chitwan, with plans to expand to more regions. Our network of rangers continues to grow as more volunteers join our mission to help animals everywhere."
        },
        {
          q: "How is ResQAll funded?",
          a: "ResQAll is funded through grants, partnerships with veterinary clinics, and donations from supporters like you. All of our rangers are volunteers who dedicate their time to saving animals. 100% of donations go directly to animal rescue operations."
        },
        {
          q: "What types of animals do you rescue?",
          a: "We rescue all types of animals including street dogs and cats, injured birds, trapped cows and goats, wildlife in distress, and any other animal that needs help. Our rangers are trained to handle various species safely."
        }
      ]
    },
    {
      category: "Reporting an Emergency",
      questions: [
        {
          q: "How do I report an animal in distress?",
          a: "You can report an animal by clicking the 'Report Emergency' button on our homepage, using our mobile app, or by calling our 24/7 hotline at 1-800-RESQALL. Please provide the animal's location, condition, species, and any other relevant details to help our rangers respond effectively."
        },
        {
          q: "What should I do while waiting for a ranger?",
          a: "Keep a safe distance from the animal, especially if it's injured or frightened. Do not attempt to handle wildlife or large animals yourself. Monitor the animal's condition and location from a safe distance, and stay by your phone in case the ranger needs to contact you for more information."
        },
        {
          q: "How quickly will a ranger respond?",
          a: "Our average response time is 15 minutes in urban areas. Response times may vary depending on location, time of day, traffic conditions, and ranger availability. We prioritize emergencies based on severity."
        },
        {
          q: "What if I find an injured bird or wildlife?",
          a: "For injured birds or wildlife, please report them through our app or hotline. Our rangers have specialized training for handling wildlife safely. Do not attempt to capture or handle wild animals yourself, as this can be dangerous for both you and the animal."
        }
      ]
    },
    {
      category: "Volunteering as a Ranger",
      questions: [
        {
          q: "How can I become a ranger?",
          a: "To become a ranger, click 'Become a Ranger' on our website and fill out the application form. We welcome volunteers from all backgrounds. We'll review your application and contact you for training if approved. No prior experience is necessary – we provide all training."
        },
        {
          q: "What training do rangers receive?",
          a: "Rangers receive comprehensive training including animal handling for different species (dogs, cats, cows, birds, etc.), first aid, emergency response protocols, safety procedures, and species-specific care. Training is provided by experienced veterinarians and rescue professionals."
        },
        {
          q: "What equipment do I need?",
          a: "We provide basic rescue equipment including gloves, carriers, first aid kits, and species-specific tools. You'll need a smartphone with our app, reliable transportation, and a willingness to help all animals in need."
        },
        {
          q: "How much time do I need to commit?",
          a: "We understand our volunteers have different schedules. You can choose your availability – whether it's a few hours a week or full-time. Every bit of help makes a difference for animals in need."
        }
      ]
    },
    {
      category: "Partnerships & Support",
      questions: [
        {
          q: "How can my veterinary clinic partner with ResQAll?",
          a: "We're always looking to partner with veterinary clinics that treat all animals. Please contact us through our partnership form or email us at partners@resqall.org. Partner clinics receive emergency cases and provide discounted care for rescued animals."
        },
        {
          q: "Do you offer sponsorship opportunities?",
          a: "Yes! We have various sponsorship opportunities available for businesses and organizations that want to support our mission to help all animals. Sponsors can support specific rescue equipment, medical supplies, or general operations. Contact us for more information."
        },
        {
          q: "Can I donate supplies instead of money?",
          a: "Absolutely! We accept donations of medical supplies, animal food, carriers, blankets, and rescue equipment. Please contact us to coordinate supply donations and see our current needs list."
        }
      ]
    }
  ];

  return (
    <div className="faq">

      {/* ── NAV ── */}
      <nav className="faq-nav">
        <div className="faq-nav-logo" onClick={() => navigate("/")}>
          <Icon type="fa" name="FaPaw" size={20} className="faq-nav-paw" />
          <span>RESQALL</span>
        </div>
        <div className="faq-nav-links">
          <button className="faq-nav-link" onClick={() => navigate("/")}>Home</button>
          <button className="faq-nav-link" onClick={() => navigate("/about")}>About Us</button>
          <button className="faq-nav-link" onClick={() => navigate("/mission")}>Our Mission</button>
          <button className="faq-nav-link" onClick={() => navigate("/contact")}>Contact</button>
          <button className="faq-nav-link faq-nav-link-active" onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <button className="faq-btn faq-btn-amber" onClick={() => navigate("/login")}>
          <Icon type="fa" name="FaExclamationTriangle" size={13} />
          Report Emergency
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="faq-hero">
        <div className="faq-hero-blob faq-hero-blob-tr" />
        <div className="faq-hero-blob faq-hero-blob-bl" />
        <div className="faq-hero-grain" />
        <div className="faq-hero-inner">
          <div className="faq-eyebrow">
            <Icon type="fa" name="FaQuestionCircle" size={13} className="faq-eyebrow-icon" />
            Got Questions?
          </div>
          <h1 className="faq-hero-headline">
            Frequently Asked <em>Questions</em>
          </h1>
          <p className="faq-hero-sub">
            Find answers to common questions about ResQAll, reporting emergencies for all animals, volunteering, and more.
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="faq-trust">
        {[
          { type: "fa", name: "FaBolt", label: "24/7 Emergency Response" },
          { type: "fa", name: "FaClock", label: "15-Min Avg Response" },
          { type: "fa", name: "FaHeart", label: "500+ Animals Saved" },
          { type: "fa", name: "FaUsers", label: "200+ Active Rangers" },
        ].map(({ type, name, label }) => (
          <div className="faq-trust-item" key={label}>
            <Icon type={type} name={name} size={14} className="faq-trust-icon" />
            {label}
          </div>
        ))}
      </div>

      {/* ── FAQ SECTION ── */}
      <section className="faq-section">
        <div className="faq-section-inner">
          {faqs.map((category, catIndex) => (
            <div className="faq-category" key={catIndex}>
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  return (
                    <div 
                      key={qIndex} 
                      className={`faq-item ${openIndex === globalIndex ? "faq-item-open" : ""}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => toggleFAQ(globalIndex)}
                      >
                        <span className="faq-question-text">{faq.q}</span>
                        <span className="faq-icon">{openIndex === globalIndex ? "−" : "+"}</span>
                      </button>
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section className="faq-still">
        <div className="faq-still-inner">
          <h2 className="faq-still-title">
            Still Have <em>Questions?</em>
          </h2>
          <p className="faq-still-text">
            Can't find the answer you're looking for? Reach out to us directly. We're here to help all animals.
          </p>
          <div className="faq-still-buttons">
            <button className="faq-btn faq-btn-white" onClick={() => navigate("/contact")}>
              <Icon type="fa" name="FaEnvelope" size={15} />
              Contact Us
            </button>
            <button className="faq-btn faq-btn-outline-white" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaUserPlus" size={15} />
              Become a Ranger
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="faq-footer">
        <div className="faq-footer-grid">
          <div className="faq-footer-brand">
            <div className="faq-footer-logo">
              <Icon type="fa" name="FaPaw" size={24} className="faq-footer-paw" />
              <span>RESQALL</span>
            </div>
            <p>Rapid response animal rescue network. Saving lives 24/7.</p>
            <div className="faq-footer-socials">
              {[
                { type: "fa", name: "FaFacebook" },
                { type: "fa", name: "FaInstagram" },
                { type: "fa", name: "FaTwitter" },
                { type: "fa", name: "FaYoutube" },
              ].map(({ type, name }) => (
                <span className="faq-footer-soc" key={name}>
                  <Icon type={type} name={name} size={16} />
                </span>
              ))}
            </div>
          </div>
          <div className="faq-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {[["About Us", "/about"], ["Our Mission", "/mission"], ["Contact", "/contact"], ["FAQ", "/faq"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="faq-footer-col">
            <h4>Get Involved</h4>
            <ul>
              {[["Become a Ranger", "/login"], ["Report Animal", "/login"], ["Partner With Us", "/login"]].map(([label, path]) => (
                <li key={label}><button onClick={() => navigate(path)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="faq-footer-col">
            <h4>Emergency</h4>
            <div className="faq-footer-phone">
              <Icon type="fa" name="FaPhone" size={13} /> 24/7 Hotline
            </div>
            <div className="faq-footer-number">1-800-RESQALL</div>
            <div className="faq-footer-email">
              <Icon type="fa" name="FaEnvelope" size={13} /> rescue@resqall.org
            </div>
            <button className="faq-footer-emerg-btn" onClick={() => navigate("/login")}>
              <Icon type="fa" name="FaExclamationCircle" size={14} />
              Report Emergency
            </button>
          </div>
        </div>
        <div className="faq-footer-bottom">
          <span>&copy; 2025 ResQAll Network. All rights reserved. Made with</span>
          <Icon type="fa" name="FaHeart" size={12} className="faq-footer-heart" />
          <span>for animal rescue in Nepal.</span>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;