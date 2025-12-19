import React from "react";
import Banner from "./Banner/Banner";
import Brands from "./Brands";
import Reviews from "./Reviews/Reviews";
import ServiceHighlights from "./ServiceHighlights";
import HomeBooks from "./HomeBooks";

const reviewsPromise = fetch("/data/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Brands></Brands>
      <HomeBooks></HomeBooks>
      <ServiceHighlights></ServiceHighlights>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
