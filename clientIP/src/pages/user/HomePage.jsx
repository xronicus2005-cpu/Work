import Header from "../../components/header/Header"
import Jobs from "../../components/jobs/Jobs"
import Advert from "../../components/advert/Advert"
import Statistics from "../../components/statistics/Statistics"
import Info from "../../components/info/Info"
import Footer from "../../components/footer/Footer"

const HomePage = () => {

    return (
        <>
            <Header/>
            <Jobs/>
            <Advert/>
            <Statistics/>
            <Info/>
            <Footer/>
        </>
    )

}

export default HomePage