import Image from "next/image";
import classes from "./Hero.module.css";
const Hero = ({ title, description, image, page, children }) => {
  let heroHelperClass;

  if (page === "traits") {
    heroHelperClass = classes.HeroLeft;
  }

  if (page === "tokenomics") {
    heroHelperClass = classes.HeroTokenomics;
  }

  if (page === "homepage") {
    heroHelperClass = classes.homePage;
  }

  if (page === "leaderboard" || page === "gallery") {
    heroHelperClass = classes.HeroCentered;
  }

  return (
    <div className={`${classes.Hero} ${heroHelperClass}`}>
      <div className="container">
        <div className={classes.HeroWrapper}>
          {title && <h1>{title}</h1>}
          {description ? <p>{description}</p> : children}
          <Image
            src={image}
            alt="hero-image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
