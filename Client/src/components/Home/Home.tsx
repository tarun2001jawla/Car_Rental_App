import React from "react";
import HeroSection from "../Herosection/HeroSection";
import BodyComponent from "../BodyContent/BodyComponent";
import ValueCards from "../valueCards/valueCards";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <BodyComponent/>
      <ValueCards/>
    </div>
  );
};

export default HomePage;
