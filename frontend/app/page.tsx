import DownloadCard from "./landing page/BottomSection/DownloadCard";
import Faq from "./landing page/FAQs/Faq";
import Youth from "./landing page/Youth/Youth"
import Events from "./landing page/Events/Event"
import Yuva from "./landing page/AboutYuva/Yuva"
import Opportunity from "./landing page/FeaturedOpportunity/Opportunity"
import Category from "./landing page/Category/Category"
import Steps from "./landing page/ThreeSteps/Steps"
import New from "./landing page/What'sNew/New"
import Hero from "./landing page/Home/Hero"
import Header from "./landing page/Navbar/Header"
import Footer from "./landing page/footer/Footer"

export default function Home() {
  return (
    <main >
     <Header/>
      <Hero/>
      <New/>
      <Category/>
      <Yuva/>
      <Steps/>
      <Opportunity/>
     <Events/> 
      <Youth/>
      <Faq/>
      <DownloadCard />
      <Footer/>
    </main>
  );
}