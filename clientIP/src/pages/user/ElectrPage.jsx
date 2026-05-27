import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "../../styles/TeachPage.css";
import { Search, MapPin, DollarSign, BookOpen, GraduationCap, Users, Globe, ExternalLink } from "lucide-react";
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth.js"


const ElectrPage = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Toliq");
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth()
    const navigate = useNavigate()

    const getAllElectrJobs = async() => {
        try{
            setLoading(true)
            const res = await api.get("get-all-electr")

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
        getAllElectrJobs()
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
    ];

    const moreInfo = (id) => {

        if(!user){
            navigate("/login")
            return
        }

        navigate(`/job/${id}`)
    }


    return (
        <>
           <div className="teach-marketplace-root">
                       <div className="teach-marketplace-container">
                           <header className="teach-marketplace-header">
                               <div className="teach-header-content">
                                   <h1 className="teach-main-title">Elektronika</h1>
                                   <p className="teach-main-subtitle">Elektr qurilmalar</p>
                               </div>
                           </header>
           
                           <section className="teach-controls-section teach-glass-effect">
                               <div className="teach-search-bar-container">
                                   <Search className="teach-search-icon" />
                                   <input 
                                       type="text" 
                                       className="teach-search-input"
                                       placeholder="Elektr injenerin izlew..." 
                                       value={searchTerm}
                                       onChange={(e) => setSearchTerm(e.target.value)}
                                   />
                               </div>
                               
                               <div className="teach-filter-pills-row">
                                   {filterOptions.map((opt) => (
                                       <button 
                                           key={opt.name}
                                           className={`teach-pill-button ${filter === opt.name ? "teach-pill-active" : ""}`}
                                           onClick={() => setFilter(opt.name)}
                                       >
                                           {opt.icon} <span>{opt.name}</span>
                                       </button>
                                   ))}
                               </div>
                           </section>
           
                           <div className="teach-jobs-display-grid">
                               {loading ? (
                                   [...Array(6)].map((_, i) => <div key={i} className="teach-shimmer-card"></div>)
                               ) : filteredJobs.length > 0 ? (
                                   filteredJobs.map((job) => (
                                       <article key={job.id} className="teach-job-card teach-glass-effect">
                                           <div className="teach-card-media">
                                               <img 
                                                   src={job.imgwork ? `http://localhost:5000${job.imgwork}` : "/placeholder.jpg"} 
                                                   alt={job.title} 
                                                   onError={handleImageError}
                                                   className="teach-media-img"
                                               />
                                               <div className="teach-profession-tag">{job.profession}</div>
                                           </div>
                                           
                                           <div className="teach-card-details">
                                               <h3 className="teach-job-name">{job.title}</h3>
                                               <p className="teach-job-summary">{job.infowork}</p>
                                               
                                               <div className="teach-card-footer-info">
                                                   <div className="teach-footer-stat">
                                                       <MapPin size={14} className="teach-green-icon" />
                                                       <span>{job.location}</span>
                                                   </div>
                                                   <div className="teach-footer-stat teach-price-tag">
                                                       <DollarSign size={14} />
                                                       <span>{Number(job.cost).toLocaleString()} UZS</span>
                                                   </div>
                                               </div>
                                               
                                               <button onClick={() => moreInfo(job.id)} className="teach-action-btn btn-primary">
                                                   <span>Kórip shıǵıw</span>
                                                   <ExternalLink size={16} />
                                               </button>
                                           </div>
                                       </article>
                                   ))
                               ) : (
                                   <div className="teach-empty-message">Hazirshe bos...</div>
                               )}
                           </div>
                       </div>
                   </div>
        </>
    )
}

export default ElectrPage