import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Star, X, BriefcaseBusiness, Upload } from 'lucide-react';
import '../../styles/MyWork.css';
import { toast } from "react-toastify";
import api from "../../api/axios.js";

const MyWorks = () => {
  const [showModal, setShowModal] = useState(false);
  const [works, setWorks] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    niche: '',
    profession: '',
    imgFile: null,
    infowork: '',
    buyersmust: '',
    cost: '',
    location: ''
  });

  const regions = ["Qaraqalpaqstan Respublikası", "Tashkent qalası", "Andijan", "Buxara", "Jizzax", "Qashqadarya", "Navoiy", "Namangan", "Samarqand", "Surxandarya", "Sirdarya", "Tashkent vilayeti", "Fergana", "Xorezm"];
  
  const worksData = {
    IT: ["Frontend", "Backend", "Android", "OS"],
    Qolmiyneti: ["Qurilis", "Santexnika", "Elektro montaj", "Remont"],
    Oqitiw: ["Online", "Offline"],
    Elektronika: ["Repair"],
    Mashinasazliq: ["Mexanik", "Kuzov"]
  };

  const getAllWorks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/get-all-works");
      if (res.data.success) {
        setWorks(res.data.works);
      }
    } catch (err) {
      toast.error("Maǵlıwmatlardı júklewde qátelik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllWorks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNicheChange = (e) => {
    setFormData(prev => ({ ...prev, niche: e.target.value, profession: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, imgFile: file }));
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Saqlanbaqta...");
    
    try {
      const sendData = new FormData();
      
      // CRITICAL: Keys must match the Backend destructuring exactly
      sendData.append("title", formData.title);
      sendData.append("niche", formData.niche);
      sendData.append("profession", formData.profession);
      sendData.append("infoWork", formData.infowork);   // Backend expects infoWork
      sendData.append("buyersMust", formData.buyersmust); // Backend expects buyersMust
      sendData.append("cost", formData.cost);
      sendData.append("location", formData.location);
      
      if (formData.imgFile) {
        sendData.append("imgWork", formData.imgFile); // Field name must match Multer single('imgWork')
      }

      const res = await api.post("/create-work", sendData);

      if (res.data.success) {
        setWorks(prev => [res.data.work, ...prev]);
        setShowModal(false);
        setImagePreview(null);
        setFormData({ title: '', niche: '', profession: '', imgFile: null, infowork: '', buyersmust: '', cost: '', location: '' });
        toast.update(loadToast, { render: "Jumıs qosıldı!", type: "success", isLoading: false, autoClose: 3000 });
      }
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || "Qátelik júz berdi";
      toast.update(loadToast, { render: msg, type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="page-wrapper">
      <header className="header">
        <h1 className="title-text">Meniń jumıslarım</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />Qosıw
        </button>
      </header>

      {loading ? (
        <div className="works-grid">
           {[1,2,3].map(n => <div key={n} className="work-card skeleton" style={{height: '400px', background: '#f2f2f7'}}></div>)}
        </div>
      ) : (
        <div className="works-grid">
          {works.map((work) => (
            <div key={work.id} className="work-card glass-card">
              <div className="card-image-container">
                <img
                  src={work.imgwork ? `http://localhost:5000${work.imgwork}` : "/placeholder.jpg"}
                  alt={work.title}
                  className="card-img"
                />
                <div className="rating-badge">
                  <Star size={14} fill="currentColor" /> {work.rating || "0.1"}
                </div>
              </div>

              <div className="card-body">
                <span className="niche-tag">{work.niche}</span>
                <h3 className="card-title">{work.title}</h3>
                <div className="profession-box">
                  <BriefcaseBusiness size={16} />
                  <span>{work.profession}</span>
                </div>
                <p className="card-description">{work.infowork}</p>
                <div className="card-footer">
                  <span className="price-text">{Number(work.cost).toLocaleString()} UZS</span>
                  <div className="location-box">
                    <MapPin size={14} /> {work.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Jańa jumıs qosıw</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="form-group">
              <div className="input-wrapper">
                 <label>Jumıs ataması</label>
                 <input className="glass-input" name="title" value={formData.title} onChange={handleChange} placeholder="Jumis ati" required />
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label>Taraw</label>
                  <select className="glass-input" name="niche" value={formData.niche} onChange={handleNicheChange} required>
                    <option value="">Taraw</option>
                    {Object.keys(worksData).map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="input-wrapper">
                  <label>Qánigelik</label>
                  <select className="glass-input" name="profession" value={formData.profession} onChange={handleChange} disabled={!formData.niche} required>
                    <option value="">Qánigelik</option>
                    {formData.niche && worksData[formData.niche].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="input-wrapper">
                <label>Súwret</label>
                <input type="file" id="file-input" hidden onChange={handleImageChange} accept="image/*" />
                <label htmlFor="file-input" className="file-upload-area">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={32} />
                      <span>Súwret júkleń</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="input-wrapper">
                <label>Maǵlıwmat</label>
                <textarea className="glass-input" name="infowork" value={formData.infowork} onChange={handleChange} placeholder="Jumıs haqqında..." rows="3" required />
              </div>

              <div className="input-wrapper">
                <label>Satıp alıwshı ushın talaplar</label>
                <input className="glass-input" name="buyersmust" value={formData.buyersmust} onChange={handleChange} placeholder="Aldinnan avans" required />
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label>Baxası</label>
                  <input className="glass-input" name="cost" value={formData.cost} onChange={handleChange} type="number" placeholder="UZS" required />
                </div>
                <div className="input-wrapper">
                  <label>Region</label>
                  <select className="glass-input" name="location" value={formData.location} onChange={handleChange} required>
                    <option value="">Regiond</option>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary submit-btn">Járyalaw</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorks;