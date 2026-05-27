import { useState } from "react";
import * as Lucide from "lucide-react";
import "../../styles/Register.css";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [fathername, setFathername] = useState("");
    const [number, setNumber] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pass, setPass] = useState("");

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

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            last_name: lastname,
            father_name: fathername,
            number: number,
            sex: sex,
            email_address: email,
            state: state,
            city: city,
            pass: pass
        };

        try {
            const res = await api.post("/create-user", formData);

            if (res.data.success === true) {
                const me = await api.get("/me");
                setUser(me.data);
                navigate("/profile");
            }
        } catch (err) {
            toast.error("Ro'yxatdan o'tishda xatolik");
            console.log(err);
        }
    };

    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };

    return (
        <div className="register-page-wrapper">
            <div className="register-card glass-card">
                <div className="register-header">
                    <h1>Ro'yxatdan o'tish</h1>
                    <p>Ma'lumotlaringizni kiriting</p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-grid">

                        <div className="input-group">
                            <Icon name="User" size={18} className="input-icon" />
                            <input placeholder="Ism" onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <Icon name="User" size={18} className="input-icon" />
                            <input placeholder="Familiya" onChange={(e) => setLastname(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <Icon name="Users" size={18} className="input-icon" />
                            <input placeholder="Otasining ismi" onChange={(e) => setFathername(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <Icon name="Phone" size={18} className="input-icon" />
                            <input type="tel" placeholder="+998" onChange={(e) => setNumber(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <Icon name="Info" size={18} className="input-icon" />
                            <select onChange={(e) => setSex(e.target.value)} required>
                                <option value="">Jinsingiz</option>
                                <option value="Erkak">Erkak</option>
                                <option value="Ayol">Ayol</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <Icon name="Mail" size={18} className="input-icon" />
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="input-group">
                            <Icon name="Map" size={18} className="input-icon" />
                            <select
                                onChange={(e) => {
                                    setState(e.target.value);
                                    setCity("");
                                }}
                                required
                            >
                                <option value="">Viloyatni tanlang</option>
                                {Object.keys(locationData).map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <Icon name="MapPin" size={18} className="input-icon" />
                            <select
                                onChange={(e) => setCity(e.target.value)}
                                disabled={!state}
                                required
                            >
                                <option value="">Tumanni tanlang</option>
                                {state &&
                                    locationData[state].map((cityItem) => (
                                        <option key={cityItem} value={cityItem}>
                                            {cityItem}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="input-group full-width">
                            <Icon name="Lock" size={18} className="input-icon" />
                            <input
                                type="password"
                                placeholder="Parol yarating"
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="register-btn btn-primary">
                        Ro'yxatdan o'tish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;