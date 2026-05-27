import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User } from "lucide-react";
import "../../styles/GptPage.css";

const GptPage = ({ close }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salem! Sizge qanday jardem bere alaman?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
       const promptText = `Iltimos, faqat o'zbek tilida javob ber. Bu sayt Nukus davlat texnika universiteti
        Raxmanbergenov Timur tarafidan yaratilgan. Bu sayt vakansiya ishlarini topishga yonaltirilgan. Bu saytta userlar
        oz kasbiga mos ishlarni topa oladi. Bosh ish vakansiyalariga yozilishi mumkin. Bu sayt odamlar ish topishini yengillashtirish uchun
        ishlab chiqilgan. Sen shu sayt uchun moslashtirilgan javob berishing kerak. Yani bu yerda userlar oddiy xalq. Userlar portfolio yaratishi mumkin
        ilgari ishlagan vaziyfalari namunasi sifatida. Ozlari ishlar yaratishi mumkin, yani masalan g'isht terea olaman, ...sum narxga ishlayman, aloqa uchun dep telefon raqamini
        qoldirip ketadi. Va osha olingan malumotlar evaziga mehnat bozoriga card ishlap chiqiladi. Yani boshqa user masalan, g'isht teruvchini izlayatgan bolsa osha mehnat bozoridagi turgan card orqali
        bog'lanishi mumkin. Vakansiyalar degan bolim bor u yerda mamlakatlik ish orinlari chiqib turadi. Savol: ${userText}`;
      

        //before impelemtation i need to change this link
      const res = await fetch("https://work.org.uz/api/askGPT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: promptText }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Xatolik yuz berdi. Qayta urinib ko'ring." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gpt-overlay" onClick={close}>
      <div className="gpt-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <header className="gpt-header">
          <div className="header-content">
            <div className="gpt-icon">
              <Bot size={20} />
            </div>
            <div className="gpt-info">
              <span className="gpt-title">Sun'iy Intellekt</span>
              <span className="gpt-status">Online</span>
            </div>
          </div>
          <button className="gpt-close-btn" onClick={close}>
            <X size={20} />
          </button>
        </header>

        <div className="gpt-body">
          {messages.map((m, i) => (
            <div key={i} className={`bubble-wrapper ${m.role}`}>
              <div className={`bubble ${m.role}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="bubble-wrapper bot">
              <div className="bubble bot typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <footer className="gpt-footer">
          <div className="input-container">
            <textarea
              placeholder="Xabar..."
              rows="1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button 
              className={`gpt-send-btn ${input.trim() ? "active" : ""}`} 
              onClick={sendMessage} 
              disabled={loading}
            >
              <Send size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GptPage;