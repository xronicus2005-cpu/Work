import { Info as InfoIcon, UserPlus, Settings, LayoutGrid, DollarSign } from "lucide-react";
import "./Info.css";

const Info = () => {
    return (
        <section className="info-container">
            <div className="info-glass-card glass-card">
                <div className="info-header">
                    <InfoIcon size={28} color="var(--primary-green)" />
                    <h2>Sayttan paydalanıw haqqında:</h2>
                </div>
                
                <p className="info-description">
                    Bul sayt Nókis Mámleketlik Texnika Universiteti 3-kurs studentleri hám oqıtıwshıları tárepinen jaratılǵan. Bul saytta hár bir shaxs óz qolınan keletuǵın jumıs penen ózin jumıs penen bánt etse boladı.
                </p>

                <div className="info-steps">
                    <div className="step-item">
                        <div className="step-badge">1</div>
                        <UserPlus size={20} />
                        <p>Yaǵnıy dáslep óz akkountınıńızdı jaratasız. </p>
                    </div>

                    <div className="step-item">
                        <div className="step-badge">2</div>
                        <Settings size={20} />
                        <p>Soń profil sazlamaların kiritesiz.</p>
                    </div>

                    <div className="step-item">
                        <div className="step-badge">3</div>
                        <LayoutGrid size={20} />
                        <p>Jumıs jaratıw bólimine ótip ózińiz isley alatuǵın jumız haqqında maǵlıwmat beresiz.</p>
                    </div>

                    <div className="step-item success">
                        <div className="step-badge">4</div>
                        <DollarSign size={20} />
                        <p>Jumısıńızdı jaratıń, Pul tabıń!</p>
                    </div>
                </div>

                <div className="info-footer">
                    <p>Bergen maǵlıwmatlarıńız miynet bazarımızǵa shıǵadı hám jumıs jallawshılar ózleri siz benen baylanısadı. </p>
                </div>
            </div>
        </section>
    );
}

export default Info;