import React, { useState, useEffect } from 'react';
import { Plus, X, MapPin, Briefcase, DollarSign, Building2 } from 'lucide-react';
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import '../../styles/MyWork.css'; 

const Vocation = () => {
  const [showModal, setShowModal] = useState(false);
  const [vocations, setVocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    work_name: '',
    info: '',
    cost: '',
    town: '',
    place: ''
  });

  const regions = {
    "Toshkent walayatı": ["Toshkent", "Yangiyo‘l", "Keles", "Zangiota", "Boʻka", "Ohangaron"],
    "Andijon walayatı": ["Andijon", "Asaka", "Jalaquduq", "Kuyganyor"],
    "Namangan walayatı": ["Namangan", "Chust", "Kosonsoy", "Pop"],
    "Fargʻona walayatı": ["Fargʻona", "Margʻilon", "Quvasoy", "Rishton"],
    "Samarqand walayatı": ["Samarqand", "Kattaqoʻrgʻon", "Ishtixon", "Narpay"],
    "Buxoro walayatı": ["Buxoro", "Vobkent", "Gʻijduvon", "Shofirkon"],
    "Qashqadaryo walayatı": ["Qarshi", "Shahrisabz", "Gʻuzor", "Kitob"],
    "Jizzax walayatı": ["Jizzax", "Gʻallaorol", "Doʻstlik"],
    "Sirdaryo walayatı": ["Guliston", "Sardoba", "Mirzaobod"],
    "Surxondaryo walayatı": ["Termiz", "Denov", "Boysun", "Qumqoʻrgʻon"],
    "Navoiy walayatı": ["Navoiy", "Tomdi", "Navbahor"],
    "Xorazm walayatı": ["Urganch", "Xiva", "Shovot", "Gurlan"],
    "Qaraqalpaqstan Respublikası": ["Nókis", "Mańǵıt", "Beruniy", "Qońırat", "Moynaq", "Tórtkól", "Taxtakópir", "Xojeli", "Shomanay", "Kegeyli", "Ellikqala", "Qanlıkól"]
  };

  // 1. Fetch Vocations - Adjusted to match your "giveAllVocation" response
  const fetchVocations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/get-vocations"); // Ensure this matches your backend route
      if (res.data.success) {
        // Your backend returns { success: true, vocations: [...] }
        setVocations(res.data.vocations); 
      }
    } catch (err) {
      console.error("Error fetching vocations:", err);
      toast.error("Maǵlıwmatlardı júklewde qátelik júz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'town' && { place: '' })
    }));
  };

  // 2. Handle Submit - Adjusted to match your "createVocation" response
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Saqlanbaqta...");
    try {
      const res = await api.post("/create-vocation", formData);
      
      if (res.data.success) {
        // Your backend returns { success: true, vocations: [newItem] }
        const newVocation = res.data.vocations[0]; 
        
        setVocations(prev => [newVocation, ...prev]);
        setShowModal(false);
        setFormData({ work_name: '', info: '', cost: '', town: '', place: '' });
        
        toast.update(loadToast, { 
            render: "Vakansiya qosıldı!", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.update(loadToast, { 
          render: err.response?.data?.message || "Qátelik júz berdi!", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
      });
    }
  };

  return (
    <div className="page-wrapper">
      <header className="header">
        <h1 className="title-text">Vakansiyalar</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Vakansiya qosıw
        </button>
      </header>

      <div className="works-grid">
        {loading ? (
            <div className="loading-state">Júklenbekte...</div>
        ) : vocations.length > 0 ? (
          vocations.map((v) => (
            <div key={v.id} className="work-card glass-card">
              <div className="card-body">
                <div className="profession-box" style={{marginBottom: '10px'}}>
                    <Building2 size={16} /> <span>{v.town}</span>
                </div>
                <h3 className="card-title">{v.work_name}</h3>
                <p className="card-description">{v.info}</p>
                <div className="card-footer">
                  <span className="price-text">
                    {/* Added check to ensure cost is a number before formatting */}
                    {v.cost ? Number(v.cost).toLocaleString() : 0} UZS
                  </span>
                  <div className="location-box">
                    <MapPin size={14} /> {v.place}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="empty-state">Házirshe vakansiyalar joq.</div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Jańa vakansiya</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="form-group">
              <div className="input-wrapper">
                <label>Jumıs ati</label>
                <div className="input-with-icon">
                  <Briefcase className="icon" size={18} />
                  <input 
                    className="glass-input with-icon" 
                    name="work_name" 
                    value={formData.work_name} 
                    onChange={handleChange} 
                    placeholder="Mısalı: Menjer" 
                    required 
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label>Aylıq baxa (UZS)</label>
                <div className="input-with-icon">
                    <DollarSign className="icon" size={18} />
                    <input 
                        className="glass-input with-icon" 
                        type="number" 
                        name="cost" 
                        value={formData.cost} 
                        onChange={handleChange} 
                        placeholder="Mısalı: 5000000" 
                        required 
                    />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label>Wálayat</label>
                  <select className="glass-input" name="town" value={formData.town} onChange={handleChange} required>
                    <option value="">Wálayattı saylań</option>
                    {Object.keys(regions).map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="input-wrapper">
                  <label>Rayon / Qala</label>
                  <select 
                    className="glass-input" 
                    name="place" 
                    value={formData.place} 
                    onChange={handleChange} 
                    disabled={!formData.town}
                    required
                  >
                    <option value="">Rayondı saylań</option>
                    {formData.town && regions[formData.town].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="input-wrapper">
                <label>Jumıs haqqında maǵlıwmat</label>
                <textarea 
                  className="glass-input" 
                  name="info" 
                  value={formData.info} 
                  onChange={handleChange} 
                  placeholder="Vakansiya talapları hám wazıypaları..." 
                  rows="4" 
                  required 
                />
              </div>

              <button type="submit" className="btn-primary submit-btn">Jaratiw</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vocation;