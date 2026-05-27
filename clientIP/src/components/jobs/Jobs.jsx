import { Link } from "react-router-dom";
import { 
  Code, 
  GraduationCap, 
  Hammer, 
  Car, 
  HardHat, 
  LayoutGrid 
} from "lucide-react";
import "./Jobs.css";

const Jobs = () => {
    return (
        <nav className="jobs-nav-bar glass-card">
            <Link to="/it" className="job-item">
                <Code size={20} />
                <span>IT</span>
            </Link>
            
            <Link to="/teach" className="job-item">
                <GraduationCap size={20} />
                <span>Oqitiw</span>
            </Link>
            
            <Link to="/hand" className="job-item">
                <Hammer size={20} />
                <span>Qol Miyneti</span>
            </Link>
            
            <Link to="/car" className="job-item">
                <Car size={20} />
                <span>Mashinasazliq</span>
            </Link>
            
            <Link to="/electr" className="job-item">
                <HardHat size={20} />
                <span>Elektronika</span>
            </Link>

        </nav>
    );
}

export default Jobs;