import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Search, MapPin, DollarSign, BookOpen, GraduationCap, Users, Globe, ExternalLink } from "lucide-react";
import "../../styles/CarPage.css"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth.js"

const CarPage = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Toliq");
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth()
    const navigate = useNavigate()

    const getAllCarJobs = async () => {

        try{
            setLoading(true)
            const res = await api.get("/get-all-car")

            if(res.data.success){
                setJobs(res.data.jobs)
            }
        }

        catch(err){
            toast.info("Qatelik")
            console.log(err)
        }

        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCarJobs()
    }, [])

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"; // Education themed backup
    };

    const filteredJobs = jobs.filter((job) => {
        // Logic to check if profession contains Online/Offline or exact match
        const matchesFilter = filter === "Toliq" || job.profession?.toLowerCase().includes(filter.toLowerCase());
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const filterOptions = [
        { name: "Toliq", icon: <BookOpen size={16} /> },
        { name: "Mexanik", icon: <Globe size={16} /> },
        { name: "Kuzov", icon: <Users size={16} /> },
    ];

    const moreInfo = (id) => {
        if(!user){
            navigate("/login")
            return
        }

        navigate(`/job/${id}`)
    }

    return(
        <>
        <div className="car-marketplace-root">
            <div className="car-marketplace-container">
                <header className="car-marketplace-header">
                    <div className="car-header-content">
                        <h1 className="car-main-title">Mashinasazliq</h1>
                        <p className="car-main-subtitle">Mexanikler</p>
                    </div>
                </header>

                <section className="car-controls-section car-glass-effect">
                    <div className="car-search-bar-container">
                        <Search className="car-search-icon" />
                        <input 
                            type="text" 
                            className="car-search-input"
                            placeholder="Mexanik izlew..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="car-filter-pills-row">
                        {filterOptions.map((opt) => (
                            <button 
                                key={opt.name}
                                className={`car-pill-button ${filter === opt.name ? "car-pill-active" : ""}`}
                                onClick={() => setFilter(opt.name)}
                            >
                                {opt.icon} <span>{opt.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="car-jobs-display-grid">
                    {loading ? (
                        [...Array(6)].map((_, i) => <div key={i} className="car-shimmer-card"></div>)
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <article key={job.id} className="car-job-card car-glass-effect">
                                <div className="car-card-media">
                                    <img 
                                        src={job.imgwork ? `http://localhost:5000${job.imgwork}` : "/placeholder.jpg"} 
                                        alt={job.title} 
                                        onError={handleImageError}
                                        className="car-media-img"
                                    />
                                    <div className="car-profession-tag">{job.profession}</div>
                                </div>
                                
                                <div className="car-card-details">
                                    <h3 className="car-job-name">{job.title}</h3>
                                    <p className="car-job-summary">{job.infowork}</p>
                                    
                                    <div className="car-card-footer-info">
                                        <div className="car-footer-stat">
                                            <MapPin size={14} className="car-green-icon" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="car-footer-stat car-price-tag">
                                            <DollarSign size={14} />
                                            <span>{Number(job.cost).toLocaleString()} UZS</span>
                                        </div>
                                    </div>
                                    
                                    <button onClick={() => moreInfo(job.id)} className="car-action-btn btn-primary">
                                        <span>Kórip shıǵıw</span>
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="car-empty-message">Hazirshe bos...</div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default CarPage