import { useAuth } from "../../hooks/useAuth";

import { useState } from "react";
import { Link } from "react-router-dom";
import * as Lucide from "lucide-react";
import "./ProfileHeader.css";

const ProfileHeader = () => {
    const {user, logout} = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false);

    const fullName = user ? `${user.name} ${user.last_name}` : "User";
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=34c759&color=fff&bold=true`;

    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };


    return (
        <div className="profile-header-container glass-card">
            <div className="header-search-section">
                <div className="search-wrapper">
                    <Icon name="Search" size={18} className="search-icon" />
                    <input type="text" placeholder="Izlew..." />
                </div>
            </div>

            <div className="header-actions">
                <Link to="/vocation" className="header-link">Vakansiya</Link>
                <Link to="/chat" className="header-icon-btn">
                    <Icon name="MessageCircle" size={22} />
                    <span className="badge">3</span>
                </Link>

                <div className="avatar-dropdown">
                    <button 
                        className="avatar-btn" 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <img src={avatarUrl} alt={fullName} />
                    </button>

                    {showUserMenu && (
                        <div className="dropdown-panel glass-card">
                            <div className="user-info">
                                {user ? (<strong>{user.name} {user.last_name}</strong>) : (<strong>NSTU STUDENT</strong>)}
                                {user ? (<span>{user.email_address}</span>) : (<span>student@nukus.uz</span>)}
                                <span></span>
                            </div>
                            <hr />
                            <Link to="/" className="dropdown-action">
                                <Icon name="ShieldCheck" size={16} /> Home
                            </Link>
                            <button className="dropdown-action danger" onClick={logout}>
                                <Icon name="LogOut" size={16} /> Shıǵıw
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;