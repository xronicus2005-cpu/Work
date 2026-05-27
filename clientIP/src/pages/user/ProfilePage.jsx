import { useAuth } from "../../hooks/useAuth.js";
import { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import "../../styles/ProfilePage.css";
import { toast } from "react-toastify";
import api from "../../api/axios.js";

const ProfilePage = () => {
    const { user, setUser } = useAuth();
    const [file, setFile] = useState(null);
    const [current, setCurrent] = useState({
        id: "",
        name: "",
        last_name: "",
        fathers_name: "",
        number: "",
        sex: "",
        email_address: "",
        state: "",
        city: "",
        role: "",
        created_at: "",
        job: "",
        info: "",
        img_profile: null,
    });


    //handleSubmit function

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // send only editable fields
            const fields = [
                "name",
                "last_name",
                "fathers_name",
                "number",
                "sex",
                "email_address",
                "state",
                "city",
                "role",
                "job",
                "info"
            ];

            fields.forEach(key => {
                formData.append(key, current[key] || "");
            });

            
            // file
            if (file) {
                formData.append("avatar", file);
            }

            const res = await api.post("/change-user-info", formData);

            if (res.data.success) {
                const me = await api.get("/me");
                setUser(me.data.user);
                setCurrent(res.data.user)
                toast.success("Janalandi!")
            }

        } catch (err) {
            toast.info("Qatelik");
            console.log(err);
        }
    };

    useEffect(() => {
        if (user) {
            setCurrent(user);
        }
    }, [user]);

    const locationData = {
            "Toshkent shahri": ["Yunusobod", "Chilonzor", "Mirzo Ulug'bek", "Mirobod", "Yashnobod", "Olmazor", "Sergeli", "Uchtepa"],
            "Qoraqalpog'iston Respublikasi": ["Nukus shahri", "Amudaryo", "Beruniy", "Qo'ng'irot", "Mo'ynoq", "Xo'jayli", "To'rtko'l"],
            "Andijon": ["Andijon shahri", "Asaka", "Xonobod", "Shahrixon", "Paxtaobod"],
            "Buxoro": ["Buxoro shahri", "Gijduvon", "Kogon", "Olot", "Qorovulbozor"],
            "Farg'ona": ["Farg'ona shahri", "Qo'qon", "Marg'ilon", "Quva", "Rishton"],
            "Jizzax": ["Jizzax shahri", "Zomin", "G'allaorol", "Do'stlik"],
            "Xorazm": ["Urganch shahri", "Xiva", "Gurlan", "Shovot"],
            "Namangan": ["Namangan shahri", "Chust", "Pop", "Uychi"],
            "Navoiy": ["Navoiy shahri", "Zarafshon", "Uchquduq", "Karmana"],
            "Qashqadaryo": ["Qarshi shahri", "Shahrisabz", "Kitob", "G'uzor"],
            "Samarqand": ["Samarqand shahri", "Kattaqo'rg'on", "Urgut", "Bulung'ur"],
            "Sirdaryo": ["Guliston shahri", "Shirin", "Yangiyer", "Boyovut"],
            "Surxondaryo": ["Termiz shahri", "Denov", "Sherobod", "Boysun"],
            "Toshkent viloyati": ["Chirchiq", "Angren", "Olmaliq", "Bekobod", "Yangiyo'l"]
        };

    // Avatar generator
    const getAvatar = () => {
        if (current.img_profile) {
            // if it's blob → preview
            if (current.img_profile.startsWith("blob:")) {
                return current.img_profile;
            }

            // if from backend → add base URL
            return `http://localhost:5000${current.img_profile}`;
        }

        const fullName = `${current.name || ""} ${current.last_name || ""}`.trim();

        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=34c759&color=fff&size=128`;
    };

    const handleChange = (e) => {
        // Extract name and value from input
        const { name, value } = e.target;

        // If password field → update password state
        if (name === "oldPassword" || name === "newPassword") {
            setPasswords(prev => ({
                ...prev,        // keep previous values
                [name]: value   // update only changed field
            }));
        } else {
            // Otherwise update user editable data
            setCurrent(prev => ({
                ...prev,        // keep previous fields
                [name]: value,  // update changed field

                // Special case:
                // If state changes → reset city
                ...(name === "state" ? { city: "" } : {})
            }));
        }
    };

        const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Save REAL file (for backend)
        setFile(selectedFile);

        // Preview (for UI only)
        const imageUrl = URL.createObjectURL(selectedFile);

        setCurrent(prev => ({
            ...prev,
            img_profile: imageUrl // only for preview
        }));
    };

    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("uz-UZ", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="profile-view-container">
            <div className="profile-grid">

                {/* LEFT SIDE */}
                <div className="profile-aside">
                    <div className="profile-card glass-card">
                        <div className="avatar-wrapper">
                            <img src={getAvatar()} alt="Profil" className="main-profile-img" />

                            <label htmlFor="photo-upload" className="change-photo-overlay">
                                <Icon name="Camera" size={20} />
                                <input
                                    type="file"
                                    id="photo-upload"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <div className="aside-details">
                            <h2>{current.name} {current.last_name}</h2>
                            <p className="user-role-text">{current?.role}</p>

                            <div className="join-badge">
                                <Icon name="Calendar" size={15} color="green" className="date-icon" />
                                <span>{formatDate(current.created_at)} sánesinen baslap</span>
                            </div>
                        </div>
                    </div>

                    <div className="stats-mini-card glass-card">
                        <div className="mini-item">
                            <label>ID</label>
                            <p>{current.id}</p>
                        </div>
                        <div className="mini-item">
                            <label>Kásibi</label>
                            <p>{current.job}</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <form onSubmit={handleSubmit}>
                <div className="profile-main-content">
                    <div className="content-card glass-card">
                        <div className="card-header">
                            <div className="header-title">
                                <Icon name="User" size={22} color="var(--primary-green)" />
                                <h3>Shaxsqa tiyisli maǵlıwmatlar</h3>
                            </div>

                            <button className="save-btn-premium" type="submit">
                                Maǵlıwmatlardı saqlaw
                            </button>
                        </div>



                        <div className="form-sections-wrapper">
                            <div className="inputs-grid">
                                <div className="input-group-profile">
                                    <label>Atıńız</label>
                                    <input name="name" value={current.name || ""} onChange={handleChange} placeholder="Kiritiń..." />
                                </div>

                                <div className="input-group-profile">
                                    <label>Familiyańız</label>
                                    <input name="last_name" value={current.last_name || ""} onChange={handleChange} placeholder="Kiritiń..." />
                                </div>

                                <div className="input-group-profile">
                                    <label>Atańızdıń atı</label>
                                    <input name="fathers_name" value={current.fathers_name || ""} onChange={handleChange} placeholder="Kiritiń..." />
                                </div>

                                <div className="input-group-profile">
                                    <label>Telefon nomerińiz</label>
                                    <input name="number" value={current.number || ""} onChange={handleChange} placeholder="+998" />
                                </div>

                                <div className="input-group-profile">
                                    <label>Jınısıńız</label>
                                    <select name="sex" value={current.sex || ""} onChange={handleChange}>
                                        <option value="">Tanlań</option>
                                        <option value="Erkak">Erkek</option>
                                        <option value="Ayol">Hayal</option>
                                    </select>
                                </div>

                                <div className="input-group-profile">
                                    <label>Email mánzilińiz</label>
                                    <input name="email_address" value={current.email_address || ""} onChange={handleChange} placeholder="example@mail.com" />
                                </div>

                                <div className="input-group-profile">
                                    <label>Wálayat / Respublika</label>
                                    <select name="state" value={current.state || ""} onChange={handleChange}>
                                        <option value="">Wálayattı saylań</option>
                                        {Object.keys(locationData).map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group-profile">
                                    <label>Qala / Rayon</label>
                                    <select
                                        name="city"
                                        value={current.city || ""}
                                        onChange={handleChange}
                                        disabled={!current.state}
                                    >
                                        <option value="">Qalanı saylań</option>
                                        {locationData[current.state]?.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group-profile full-width">
                                    <label>Ózińiz haqqıńızda qosımsha maǵlıwmat</label>
                                    <textarea
                                        name="info"
                                        value={current.info || ""}
                                        onChange={handleChange}
                                        placeholder="Toliqlıraq jazıń..."
                                    />

                                    <label>Kasibi</label>
                                    <input type="text" name="job" value={current?.job || ""} onChange={handleChange} placeholder="Kasip"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;