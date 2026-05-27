import * as Lucide from "lucide-react"; // Import everything as an object
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Helper to safely get icons regardless of naming quirks
    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };

    return (
        <footer className="footer-container">
            <div className="footer-content glass-card">
                <div className="footer-grid">
                    
                    {/* Brand Section */}
                    <div className="footer-section">
                        <h3 className="footer-logo">Work</h3>
                        <p className="footer-about">
                            Nokis Mamleketlik Texnika Universiteti
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon">
                                <Icon name="Instagram" size={20} />
                            </a>
                            <a href="#" className="social-icon">
                                <Icon name="Send" size={20} />
                            </a>
                            <a href="#" className="social-icon">
                                <Icon name="Github" size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Bolimler</h4>
                        <ul>
                            <li><a href="#">Vakansiyalar</a></li>
                            <li><a href="#">Xizmetler</a></li>
                            <li><a href="#">Biz haqqında</a></li>
                            <li><a href="#">Járdem</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4>Baylanis</h4>
                        <div className="contact-item">
                            <Icon name="Phone" size={18} color="var(--primary-green)" />
                            <span>+998 (91) 870 32 33</span>
                        </div>
                        <div className="contact-item">
                            <Icon name="Mail" size={18} color="var(--primary-green)" />
                            <span>info@nukus-work.uz</span>
                        </div>
                        <div className="contact-item">
                            <Icon name="MapPin" size={18} color="var(--primary-green)" />
                            <span>Nukus, Qaraqalpaqstan</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Work Platformasi.</p>
                    <div className="maker-credit">
                        Made by NMTU Students
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
