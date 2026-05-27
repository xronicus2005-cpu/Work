import { useState } from "react";
import { MessageCircle } from "lucide-react";
import GptPage from "../../pages/user/GptPage";
import "../../styles/GptPage.css";


const GptButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`gpt-float-container ${open ? 'hidden' : ''}`}>
        <button 
          className="gpt-float-btn" 
          onClick={() => setOpen(true)} 
          aria-label="Open AI Assistant"
        >
          <div className="gpt-btn-glow"></div>
          <MessageCircle size={30} strokeWidth={2.5} />
        </button>
      </div>

      {open && <GptPage close={() => setOpen(false)} />}
    </>
  );
};

export default GptButton;