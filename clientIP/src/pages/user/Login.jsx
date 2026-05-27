import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import * as Lucide from "lucide-react";
import "../../styles/Login.css";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { setUser } = useAuth()
    

    // Helper for safe icon rendering
    const Icon = ({ name, ...props }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon {...props} /> : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post("/login", {
                email_address: email,
                pass: password
            })

            if (res.data.success == true) {
                //get users info

                const me = await api.get("/me")
                setUser(me.data)
                navigate("/profile")
            }
        }
        catch (err) {
            toast.info("Login yaki parol qate")
            console.log(err)
        }
    }


    return (
        <div className="login-page-wrapper">
            <div className="login-card glass-card">
                <div className="login-header">
                    <div className="login-icon-bg">
                        <Icon name="User" size={32} color="var(--primary-green)" />
                    </div>
                    <h1>Xosh kelipsiz</h1>
                    <p>Dawam etiw ushin akkountinizga kirin!</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <Icon name="Mail" size={20} className="input-icon" />
                        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <Icon name="Lock" size={20} className="input-icon" />
                        <input type="password" placeholder="Parol" required onChange={(e) => setPassword(e.target.value)} />
                    </div>



                    <button type="submit" className="login-btn btn-primary">
                        Kiriw
                    </button>
                </form>

                <div className="login-footer">
                    <span>Akkountiniz joqpa?</span>
                    <Link to="/register" className="register-link">Registraciyadan otiw</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;