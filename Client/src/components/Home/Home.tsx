import React from "react";
import HeroSection from "../Herosection/HeroSection";
import ValueCards from "../valueCards/valueCards";
import CustomerReviews from "../CustomerReviews/CustomerReviews";
import Services from "../services/Services";
import FAQSection from "../FAQSection/FaqSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      <Services/>
      <ValueCards/>
      <CustomerReviews/>
      <FAQSection/>

    </div>
  );
};

export default HomePage;
