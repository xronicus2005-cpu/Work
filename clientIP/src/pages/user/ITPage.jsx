import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Search, MapPin, DollarSign, Monitor, Code, Smartphone, Cpu, ExternalLink } from "lucide-react";
import api from "../../api/axios";
import "../../styles/ITPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"

const ITPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Toliq");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
    const { user } = useAuth()

    const getAllItJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get("/get-all-it-jobs");
            if (res.data.success) {
                setJobs(res.data.jobs);
            }
        } catch (err) {
            toast.error("Maǵlıwmatlardı júklewde qátelik!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllItJobs();
    }, []);

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"; // High-quality IT backup image
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesFilter = filter === "Toliq" || job.profession?.toLowerCase().includes(filter.toLowerCase());
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const filterOptions = [
        { name: "Toliq", icon: <Monitor size={16} /> },
        { name: "Frontend", icon: <Code size={16} /> },
        { name: "Backend", icon: <Cpu size={16} /> },
        { name: "Android", icon: <Smartphone size={16} /> },
        { name: "OS", icon: <Monitor size={16} /> },
    ];

    const moreInfo = (id) => {
        if (!user) {
            navigate("/login")
            return
        }

        navigate(`/job/${id}`)
    }

    return (
        <div className="it-marketplace-root">
            <div className="it-marketplace-container">
                <header className="it-marketplace-header">
                    <div className="it-header-content">
                        <h1 className="it-main-title">IT</h1>
                        <p className="it-main-subtitle">Keleshek kásibi</p>
                    </div>
                </header>

                <section className="it-controls-section it-glass-effect">
                    <div className="it-search-bar-container">
                        <Search className="it-search-icon" />
                        <input
                            type="text"
                            className="it-search-input"
                            placeholder="Qanday jumısshi islep atirsiz?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="it-filter-pills-row">
                        {filterOptions.map((opt) => (
                            <button
                                key={opt.name}
                                className={`it-pill-button ${filter === opt.name ? "it-pill-active" : ""}`}
                                onClick={() => setFilter(opt.name)}
                            >
                                {opt.icon} <span>{opt.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="it-jobs-display-grid">
                    {loading ? (
                        [...Array(6)].map((_, i) => <div key={i} className="it-shimmer-card"></div>)
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <article key={job.id} className="it-job-card it-glass-effect">
                                <div className="it-card-media">
                                    <img
                                        src={job.imgwork ? `http://localhost:5000${job.imgwork}` : "/placeholder.jpg"}
                                        alt={job.title}
                                        onError={handleImageError}
                                        className="it-media-img"
                                    />
                                    <div className="it-profession-tag">{job.profession}</div>
                                </div>

                                <div className="it-card-details">
                                    <h3 className="it-job-name">{job.title}</h3>
                                    <p className="it-job-summary">{job.infowork}</p>

                                    <div className="it-card-footer-info">
                                        <div className="it-footer-stat">
                                            <MapPin size={14} className="it-green-icon" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="it-footer-stat it-price-tag">
                                            <DollarSign size={14} />
                                            <span>{Number(job.cost).toLocaleString()} UZS</span>
                                        </div>
                                    </div>

                                    <button onClick={() => moreInfo(job.id)} className="it-action-btn btn-primary">
                                        <span>Kórip shıǵıw</span>
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="it-empty-message">Hazirshe bos...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ITPage;