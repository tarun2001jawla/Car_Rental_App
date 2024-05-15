import React from "react";
import HeroSection from "../Herosection/HeroSection";
import BodyComponent from "../BodyContent/BodyComponent";
import ValueCards from "../valueCards/valueCards";
import CustomerReviews from "../CustomerReviews/CustomerReviews";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <BodyComponent/>
      <ValueCards/>
      <CustomerReviews/>

    </div>
  );
};

export default HomePage;
