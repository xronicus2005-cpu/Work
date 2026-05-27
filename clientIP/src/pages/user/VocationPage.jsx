import "../../styles/VocationPage.css";
import api from "../../api/axios.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Search, MapPin, Briefcase, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const VocationPage = () => {
    const [voc, setVoc] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("Barlıǵı");

    // All Uzbekistan regions in Karakalpak
    const uzbRegions = [
        "Barlıǵı",
        "Qaraqalpaqstan",
        "Tashkent qalası",
        "Tashkent walayatı",
        "Andijan",
        "Buxara",
        "Ferǵana",
        "Jizzaq",
        "Xorezm",
        "Namangan",
        "Nawayı",
        "Qashqadarya",
        "Samarqand",
        "Sirdarya",
        "Surxandarya"
    ];

    const getAllVoc = async () => {
        try {
            const res = await api.get("/get-all-voc");
            if (res.data.success) {
                setVoc(res.data.voc);
            }
        } catch (err) {
            toast.error("Maǵlıwmatlardı júklewde qátelik!");
        }
    };

    useEffect(() => {
        getAllVoc();
    }, []);

    const filteredVoc = voc.filter(item => {
        const matchesSearch = item.work_name.toLowerCase().includes(searchTerm.toLowerCase());
        // Handling the Karakalpak filtering logic
        const matchesRegion = selectedRegion === "Barlıǵı" || item.town === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="voca-page-container">
            <div className="voca-page-wrapper">
                
                {/* HERO SECTION */}
                <header className="voca-page-header">
                    <div className="voca-page-badge">
                        <Sparkles size={14} /> <span>Jańa imkaniyatlar</span>
                    </div>
                    <h1 className="voca-page-title">Vakansiyalar Portalı</h1>
                    <p className="voca-page-subtitle">Ózińizge mas jumıstı búgin tabiń</p>
                    
                    {/* SEARCH BAR */}
                    <div className="voca-page-search-container">
                        <div className="voca-page-search-wrapper">
                            <Search className="voca-page-search-icon" size={22} />
                            <input 
                                type="text" 
                                placeholder="Lawazım yamasa kásip boyınsha izlew..." 
                                className="voca-page-search-input"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* REGION CHIP FILTER */}
                    <div className="voca-page-filter-scroll">
                        {uzbRegions.map((region) => (
                            <button 
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`voca-page-filter-chip ${selectedRegion === region ? 'active' : ''}`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </header>

                {/* CARDS GRID */}
                <div className="voca-page-grid">
                    {filteredVoc.length > 0 ? (
                        filteredVoc.map((item) => (
                            <Link to={`/job/${item.id}`} key={item.id} className="voca-page-card-link">
                                <div className="voca-page-card glass-card">
                                    <div className="voca-page-card-header">
                                        <div className="voca-page-icon-wrapper">
                                            <Briefcase size={22} />
                                        </div>
                                        <div className="voca-page-price-tag">
                                            {Number(item.cost).toLocaleString()} SUM
                                        </div>
                                    </div>

                                    <h3 className="voca-page-work-name">{item.work_name}</h3>
                                    <p className="voca-page-info-text">{item.info}</p>

                                    <div className="voca-page-card-footer">
                                        <div className="voca-page-location">
                                            <MapPin size={16} />
                                            <span>{item.town}, {item.place}</span>
                                        </div>
                                        <div className="voca-page-arrow">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="voca-page-empty-state">
                            <div className="voca-page-empty-icon">🔍</div>
                            <h3>Hesh nárse tabılmadı</h3>
                            <p>Basqa regiondı yamasa basqa sózdi sınap kóriń</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VocationPage;