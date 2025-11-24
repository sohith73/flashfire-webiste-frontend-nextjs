import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageCareerCTA from "@/src/components/homePageCareerCTA/homePageCareerCTA";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageMilestones from "@/src/components/homePageMilestones/homePageMilestones";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePagePTNote from "@/src/components/homePagePTNote/homePagePTNote";
import HomePageResultStats from "@/src/components/homePageResultStats/homePageResultStats";
import HomePageStatsCards from "@/src/components/homePageStatsCards/homePageStatsCards";
import HomePageSteps from "@/src/components/homePageSteps/homePageSteps";
import HomePageTestimonialsVideo from "@/src/components/homePageTestimonialsVideo/homePageTestimonialsVideo";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection /> {/* using useState, so client */}
      <HomePageCareerCTA />
      <HomePageResultStats />
      <HomePageStatsCards />
      <HomePageOfferLetters />
     
      <HomePageMilestones /> 
      <HomePageVideo />
      <HomePageSteps />
     
     
      <HomePageWhyChooseFF /> 
      <HomePageHappyUsers />
      <HomePagePricingPlans />
      <HomePageFoundersNote />

      {/* using useState, so client */}
     
       {/* using useState, so client */}
      {/* AJ section not so good */}
      
      <HomePagePTNote /> {/* PT section not so good */}
     
      <HomePageFAQ /> {/* using useState, so client */}
      <HomePageDemoCTA />
     
     
      <Footer />
      <SalesPopUp />
    </>
  );
};

export default Home;
