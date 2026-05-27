import { useState } from "react"
import {toast} from "react-toastify"
import api from "../../api/axios.js"
import { useEffect } from "react"
import { Search, MapPin, DollarSign, BookOpen, GraduationCap, Users, Globe, ExternalLink } from "lucide-react";
import "../../styles/HandPage.css"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth.js"

const HandPage = () => {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("Toliq")
    const [searchTerm, setSearchTerm] = useState("")
    const {user} = useAuth()
    const navigate = useNavigate()

    const getAllHandJobs = async() => {
        try{
            setLoading(true)
            const res = await api.get("/get-all-hand")
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
        getAllHandJobs()
    }, [])

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
    }

    const filteredJobs = jobs.filter((job) => {
        const matchesFilter = filter === "Toliq" || job.profession?.toLowerCase().includes(filter.toLocaleLowerCase())
        const matchesSearch = job.title?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())

        return matchesFilter && matchesSearch
    })

    const filterOptions = [
        {name: "Toliq", icon: <BookOpen size={16} /> },
        { name: "Qurilis", icon: <Globe size={16} /> },
        { name: "Santexnika", icon: <Users size={16} /> },
        { name: "Elektro montaj", icon: <GraduationCap size={16} /> },
        { name: "Remont", icon: <GraduationCap size={16} /> },
        
    ]

    const moreInfo = (id) => {

        if(!user){
            navigate("/login")
            return
        }

        navigate(`/job/${id}`)
    }

    return (
        <>
            <div className="hand-marketplace-root">
                <div className="hand-marketplace-container">
                    <header className="hand-header-content">
                        <h1 className="hand-main-title">Qol miyneti</h1>
                        <p className="hand-main-subtitle">Qoli gul ustalar</p>
                    </header>

                    <section className="hand-controls-section hand-glass-effect">
                        <div className="hand-search-bar-container">
                            <Search className="hand-search-icon"/>
                            <input 
                                type="text"
                                className="hand-search-input"
                                placeholder="Usta izlew..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>

                        <div className="hand-filter-pills-row">
                            {filterOptions.map((opt) => (
                                <button
                                    key={opt.name}
                                    className={`hand-pill-button ${filter === opt.name ? "hand-pill-active" : ""}`}
                                    onClick={() => setFilter(opt.name)}
                                >
                                    {opt.icon} <span>{opt.name}</span>
                                </button>
                            ))}

                        </div>
                    </section>

                    <div className="hand-jobs-display-grid">
                        {loading ? (
                            [...Array(6)].map((_, i) => <div key={i} className="hand-shummer-card"></div>)
                        ): filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <article key={job.id} className="hand-job-card hand-glass-effect">
                                    <div className="hand-card-media">
                                        <img 
                                            src={job.imgwork ? `http://localhost:5000${job.imgwork}` : "/placeholder.jpg"} 
                                            alt={job.title}
                                            onError={handleImageError}
                                            className="hand-media-img"
                                        />
                                        <div className="hand-profession-tag">{job.profession}</div>

                                    </div>

                                    <div className="hand-card-details">
                                    <h3 className="hand-job-name">{job.title}</h3>
                                    <p className="hand-job-summary">{job.infowork}</p>
                                    
                                    <div className="hand-card-footer-info">
                                        <div className="hand-footer-stat">
                                            <MapPin size={14} className="hand-green-icon" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="hand-footer-stat hand-price-tag">
                                            <DollarSign size={14} />
                                            <span>{Number(job.cost).toLocaleString()} UZS</span>
                                        </div>
                                    </div>
                                    
                                    <button onClick={() => {moreInfo(job.id)}} className="hand-action-btn btn-primary">
                                        <span>Kórip shıǵıw</span>
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                                </article>
                            ))
                        ): (
                        <div className="hand-empty-message">Házirshe bos...</div>

                        )}

                    </div>

                </div>

            </div>
        </>
    )
}

export default HandPage
