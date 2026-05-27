import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import photo1 from "../../assets/photo1.png";
import photo2 from "../../assets/photo2.png";
import photo3 from "../../assets/photo3.png";
import "./Advert.css";

const Advert = () => {
    const images = [photo1, photo2, photo3];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Changes every 3 seconds as requested
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3000); 
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <section className="advert-container">
            <div className="advert-glass-card glass-card">
                
                <div 
                    className="advert-track" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="advert-slide"
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>

                {/* Static Content Layer */}
                <div className="advert-content-overlay">
                    <div className="advert-text-block">
                        <h1 className="advert-headline">Jana jumis vakansiyalar</h1>
                        <p className="advert-subline">
                            Registraciyadan otin<br />
                            Jumis tabin
                        </p>
                        <button className="advert-cta-btn btn-primary">Registraciya</button>
                    </div>
                </div>

                <button className="nav-btn prev glass-btn" onClick={prevSlide}>
                    <ChevronLeft size={28} strokeWidth={1} />
                </button>
                <button className="nav-btn next glass-btn" onClick={nextSlide}>
                    <ChevronRight size={28} strokeWidth={1} />
                </button>

                <div className="dots-container glass-pills">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentIndex ? "active-dot" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advert;