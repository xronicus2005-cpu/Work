import { Users, TrendingUp, Briefcase } from "lucide-react";
import "./Statistics.css";
import { useState, useEffect } from "react";
import api from "../../api/axios.js"

const Statistics = () => {

    const [users, setUsers] = useState("0")
    const [weeklyUsers, setWeeklyUsers] = useState("0")
    const [works, setWorks] = useState("0")


    const getStat = async () => {

        try{
            const res = await api.get("/get-stat")

            if(res.data.success){
                setUsers(res.data.users)
                setWeeklyUsers(res.data.weekly)
                setWorks(res.data.works)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getStat()
    }, [])

    return (
        <section className="stats-container">
            {/* Total Users Widget */}
            <div className="stat-card glass-card">
                <div className="stat-icon-wrapper">
                    <Users size={24} color="var(--primary-green)" />
                </div>
                <div className="stat-info">
                    <span className="stat-label">Paydalaniwshilar</span>
                    <h3 className="stat-value">{users}</h3>
                </div>
            </div>

            {/* Weekly Growth Widget */}
            <div className="stat-card glass-card">
                <div className="stat-icon-wrapper blue-tint">
                    <TrendingUp size={24} color="#007aff" /> {/* iOS Blue */}
                </div>
                <div className="stat-info">
                    <span className="stat-label">Usi haptede kirgenler</span>
                    <h3 className="stat-value">+{weeklyUsers}</h3>
                </div>
            </div>

            {/* Active Jobs Widget */}
            <div className="stat-card glass-card">
                <div className="stat-icon-wrapper">
                    <Briefcase size={24} color="var(--primary-green)" />
                </div>
                <div className="stat-info">
                    <span className="stat-label">Jumislar</span>
                    <h3 className="stat-value">{works}</h3>
                </div>
            </div>
        </section>
    );
}

export default Statistics;