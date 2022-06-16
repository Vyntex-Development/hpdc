import classes from "./AboutDiamonds.module.css";
import DigitalDiamondCard from "./DigitalDiamondCard/DigitalDiamondCard";

const AboutDiamonds = ({ aboutDiamonds }) => {
  const { title, description, card: cards } = aboutDiamonds;
  return (
    <div className={`${classes.AboutDiamonds} container`}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={classes.CardsWrapper}>
        {cards.map(({ title, description, image }, i) => {
          return (
            <DigitalDiamondCard
              key={i}
              title={title}
              image={image}
              description={description[0].description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutDiamonds;
