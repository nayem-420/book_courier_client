import Marquee from "react-fast-marquee";

import amazon from "../../assets/brands/amazon.jpg";
import batighor from "../../assets/brands/batighor.jpg";
import biblio from "../../assets/brands/biblio.jpg";
import kothaprokash from "../../assets/brands/kothaprokash.jpg";
import rokomari from "../../assets/brands/rokomari.jpg";
import wikipedia from "../../assets/brands/wikipidia.jpg";

const Brands = () => {
  const brands = [amazon, batighor, biblio, kothaprokash, rokomari, wikipedia];

  return (
    <div className="py-14 bg-gray-50 mt-8 rounded-2xl">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#FF6B35]">
        Our Supporting Partners
      </h1>

      {/* Paragraph */}
      <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        We proudly collaborate with trusted bookstores and publishing partners
        to ensure a wide collection of quality books and fast, reliable delivery
        for our readers.
      </p>

      {/* Marquee */}
      <div className="mt-10">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {brands.map((brand, index) => (
            <div key={index} className="mx-10 flex items-center justify-center">
              <img
                src={brand}
                alt="brand logo"
                className="h-16 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Brands;