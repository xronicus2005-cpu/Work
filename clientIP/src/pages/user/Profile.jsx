import { Outlet } from "react-router-dom";
import Sidebar from "../../components/side-bar/Sidebar";
import ProfileHeader from "../../components/profile-header/ProfileHeader";
import "../../styles/Profile.css";

const Profile = () => {
    return (
        <div className="profile-layout">
            {/* The fixed Sidebar */}
            <aside className="profile-sidebar-wrapper">
                <Sidebar />
            </aside>

            <div className="profile-main-content">
                {/* The dynamic Profile Header */}
                <header className="profile-header-wrapper">
                    <ProfileHeader />
                </header>

                {/* The changing content area */}
                <main className="profile-view-area">
                    <div className="view-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;