import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { 
    User, Briefcase, MapPin, Phone, Mail, 
    Star, Info, Send, Globe, Award, CheckCircle
} from "lucide-react";
import "../../styles/ForEachJob.css";
import {Link} from "react-router-dom"

const ForEachJob = () => {
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const getDetailsForJob = async () => {
        try {
            const res = await api.get(`/get-job-details/${id}`);
            if (res.data.success) {
                setJob(res.data.job);
                setUser(res.data.user);
            }
        } catch (err) {
            toast.error("Maǵlıwmatlardı júklewde qátelik!");
        }
    };

    useEffect(() => {
        getDetailsForJob();
    }, [id]);

    console.log(user)

    if (!job || !user) return <div className="job-page-container">Júklenbekte...</div>;

    return (
        <div className="for-job-page-container">
            <div className="for-job-wrapper">
                
                {/* JOB DETAILS CARD */}
                <div className="for-glass-card">
                    <div className="for-work-banner-container">
                        <img src={`http://localhost:5000${job.imgwork}`} alt="Work" className="for-work-banner-img" />
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                        <div>
                            <h1 className="for-section-title" style={{fontSize: '2.2rem', marginBottom: '4px', letterSpacing: '-0.5px'}}>
                                {job.title}
                            </h1>
                            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                <span style={{color: 'var(--primary-green)', fontWeight: '600'}}>{job.niche}</span>
                                <span style={{color: '#ccc'}}>•</span>
                                <span style={{color: 'var(--text-secondary)'}}>{job.profession}</span>
                            </div>
                        </div>
                        <div className="for-price-tag">{Number(job.cost).toLocaleString()} SUM</div>
                    </div>

                    <div className="for-info-grid">
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><MapPin size={22}/></div>
                            <div className="for-info-content">
                                <span className="for-info-label">Mánzil</span>
                                <span className="for-info-value" style={{fontWeight: '600'}}>{job.location}</span>
                            </div>
                        </div>
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><Star size={22} fill="currentColor"/></div>
                            <div className="for-info-content">
                                <span className="for-info-label">Reyting</span>
                                <span className="for-info-value" style={{fontWeight: '600'}}>{job.rating} / 5.0</span>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <h3 className="for-section-title" style={{fontSize: '1.2rem', display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <Info size={20} color="var(--primary-green)"/> Jumis Haqqinda
                        </h3>
                        <div style={{background: '#f9f9fb', padding: '20px', borderRadius: '18px', border: '1px solid #eee'}}>
                            <p className="for-info-value" style={{lineHeight: '1.7', color: '#333'}}>{job.buyersmust}</p>
                        </div>
                    </div>
                </div>

                {/* ENHANCED USER CARD */}
                <div className="for-glass-card">
                    <div className="for-user-hero">
                        <div className="for-profile-img-wrapper">
                            <img src={`http://localhost:5000${user.img_profile}`} alt="User" className="for-profile-img" />
                            <div className="for-status-badge"></div>
                        </div>
                        <div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <h2 style={{fontSize: '1.7rem', margin: 0}}>{user.name} {user.last_name}</h2>
                                <CheckCircle size={20} color="#34c759" fill="#34c75922" />
                            </div>
                            <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '4px 0'}}>{user.job}</p>
                            <div style={{display: 'flex', gap: '8px', marginTop: '12px'}}>
                                <span style={{fontSize: '0.85rem', background: 'white', border: '1px solid #ddd', padding: '5px 15px', borderRadius: '100px', fontWeight: '500'}}>
                                    {user.role}
                                </span>
                                <span style={{fontSize: '0.85rem', background: 'white', border: '1px solid #ddd', padding: '5px 15px', borderRadius: '100px', fontWeight: '500'}}>
                                    {user.sex}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="for-info-grid">
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><Phone size={20}/></div>
                            <div className="for-info-content">
                                <span className="for-info-label">Telefon</span>
                                <span className="for-info-value">{user.number}</span>
                            </div>
                        </div>
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><Mail size={20}/></div>
                            <div className="for-info-content">
                                <span className="for-info-label">Email</span>
                                <span className="for-info-value">{user.email_address}</span>
                            </div>
                        </div>
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><Globe size={20}/></div>
                            <div className="for-info-content">
                                <span className="for-info-label">Aymaq</span>
                                <span className="for-info-value">{user.state}, {user.city}</span>
                            </div>
                        </div>
                        <div className="for-info-box">
                            <div className="for-icon-wrapper"><Award size={20}/></div>
                            <div className="for-info-content">
                                
                                <span className="for-info-value">{user.fathers_name}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop: '30px', padding: '20px', borderLeft: '4px solid var(--primary-green)', background: 'rgba(52, 199, 89, 0.03)', borderRadius: '0 15px 15px 0'}}>
                        <p className="for-info-value" style={{fontStyle: 'italic', fontSize: '1rem', color: '#555'}}>
                            “{user.info}”
                        </p>
                    </div>
                </div>

                {/* STICKY FOOTER ACTION */}
                <div className="for-footer-actions">
                    <Link to={`/chat/${user.id}`} className="for-btn-primary for-btn-full" style={{borderRadius: '20px', color: "white", textDecoration: "none"}}>
                        <Send size={22} /> Baylanısıw
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForEachJob;