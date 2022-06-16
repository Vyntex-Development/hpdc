import classes from "./Card.module.css";
import Video from "./Video";

const Card = (props) => {
  const { mediaUrl, mediaUrlWebm, children } = props;
  return (
    <div className={classes.Card}>
      <div className={classes.CardVideoWrapper}>
        <Video mediaUrlWebm={mediaUrlWebm} mediaUrlMp4={mediaUrl} />
      </div>
      <div className={classes.CardInfoWrapper}>{children}</div>
    </div>
  );
};

export default Card;
