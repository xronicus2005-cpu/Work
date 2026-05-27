import { Link, useLocation } from "react-router-dom";
import * as Lucide from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
    const location = useLocation();

    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };

    const navItems = [
        { name: "Profil", path: "/profile", icon: "User" },
        { name: "Meniń jumıslarım", path: "/profile/my-works", icon: "Briefcase" },
        { name: "Vakansiyalarim", path: "/profile/my-voc", icon: "Settings" },
    ];

    return (
        <div className="sidebar-container glass-card">
            <div className="sidebar-brand">
                <div className="brand-icon-wrapper">
                    <Icon name="Zap" size={20} fill="var(--primary-green)" color="var(--primary-green)" />
                </div>
                <h2>Dashboard</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        <Icon name={item.icon} size={20} />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <Icon name="LogOut" size={20} />
                    <span>Shıǵıw</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;