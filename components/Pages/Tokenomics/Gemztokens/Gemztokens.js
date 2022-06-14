import CustomLink from "../../../UI/CustomLink";
import classes from "./GemzTokens.module.css";
import Image from "next/image";

const GemzTokens = ({ gemzTokens }) => {
  const {
    title,
    button: buttonText,
    description_main,
    card,
    description_first,
    description_second,
    description_third,
  } = gemzTokens;

  let paraFirst, paraSecond, paraThird;

  if (description_third) {
    [paraFirst, paraSecond, paraThird] = description_third.split("<>");
  }

  return (
    <div className={`${classes.Gemztokens} container`}>
      <div>
        <h2>{title}</h2>
        <p>{description_main}</p>
        <CustomLink href="/gallery" type="blue">
          {buttonText}
        </CustomLink>
      </div>
      <div>
        <div className={classes.GemzCards}>
          <h4>{card[0].title}</h4>
          <p>{card[0].description[0].description}</p>
          <div className={classes.ImagesWrapper}>
            <Image
              src={card[0].image.data.attributes.url}
              alt="games-image"
              width={149}
              height={134}
            />
          </div>
        </div>
        <div className={classes.GemzCards}>
          <h4>{card[1].title}</h4>
          <p>{card[1].description[0].description}</p>
          <p>{card[1].description[1].description}</p>
          <div className={classes.ImagesWrapper}>
            <Image
              src={card[1].image.data.attributes.url}
              alt="diamonds-image"
              width={112}
              height={112}
            />
          </div>
        </div>
      </div>
      <div>
        <p>{description_first}</p>
        <p>{description_second}</p>
      </div>
      <div>
        <p>
          {paraFirst}
          <span>{paraSecond}</span>
          {paraThird}
        </p>
      </div>
    </div>
  );
};

export default GemzTokens;
