import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserCircle, Briefcase, LogIn, UserPlus, Settings, LogOut } from "lucide-react";
import "./Header.css";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const {logout} = useAuth()

    return (
        <header className="header-container glass-card">
            <div className="header-left">
                <div className="logo">
                    <Briefcase size={24} color="var(--primary-green)" />
                    <h2>Work</h2>
                </div>
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Izlew..." />
                </div>
            </div>

            <nav className="header-center">
                <Link to="/vocation" className="nav-link">Vakansiya</Link>
                <Link to="/login" className="nav-link">Kiriw</Link>
                <Link to="/register" className="btn-primary">Registraciya</Link>
            </nav>

            <div className="header-right">
                <button 
                    className="icon-button" 
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                    <UserCircle size={28} strokeWidth={1.5} />
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-menu glass-card">
                        <Link to="/profile" className="dropdown-item">
                            <Settings size={16} />Profil
                        </Link>
                        <hr />
                        <button className="dropdown-item logout" onClick={logout}>
                            <LogOut size={16} /> Shigiw
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;