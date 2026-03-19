import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon"; // Adjust the import path as needed
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
    <div className="faq-page">
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-top"></div>
      <div className="bg-shape bg-shape-bottom"></div>
      <div className="bg-circle-right"></div>
      <div className="bg-circle-left"></div>

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <div className="section-badge">
            <span className="badge-icon">
              <Icon type="fa" name="FaQuestionCircle" size={16} />
            </span>
            <span>Got Questions?</span>
          </div>
          <h1 className="hero-title">
            Frequently Asked <span>Questions</span>
          </h1>
          <p className="hero-description">
            Find answers to common questions about ResQAll, reporting emergencies for all animals, volunteering, and more.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="faq-section">
        <div className="faq-container">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="faq-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  return (
                    <div 
                      key={qIndex} 
                      className={`faq-item ${openIndex === globalIndex ? "open" : ""}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => toggleFAQ(globalIndex)}
                      >
                        <span className="question-text">{faq.q}</span>
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

      {/* Still Have Questions */}
      <section className="still-questions">
        <div className="questions-content">
          <h2 className="questions-title">
            Still Have <span>Questions?</span>
          </h2>
          <p className="questions-text">
            Can't find the answer you're looking for? Reach out to us directly. We're here to help all animals.
          </p>
          <div className="questions-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
            <button className="btn-outline btn-large" onClick={() => navigate("/login")}>
              Become a Ranger
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Updated to match Contact page */}
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

export default FAQ;
