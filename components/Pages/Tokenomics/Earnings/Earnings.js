import classes from "./Earnings.module.css";
import Image from "next/image";

const Earnings = ({ earnings }) => {
  const { title, image, paragraph } = earnings;
  return (
    <div className={`${classes.Earnings} container`}>
      <div className={classes.ImageWrapper}>
        <Image
          src={image.data.attributes.url}
          alt="earnings-image"
          layout="fill"
        />
      </div>
      <div className={classes.Text}>
        <h2>{title}</h2>
        <p>{paragraph[0].description}</p>
        <div>
          <p>{paragraph[1].description}</p>
          <p>{paragraph[2].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
