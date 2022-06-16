import classes from "./Card.module.css";
import Video from "./Video";
import React from "react";

const Card = React.forwardRef(({ mediaUrlWebm, mediaUrl, children }, ref) => {
  return (
    <div className={classes.Card}>
      <div className={classes.CardVideoWrapper}>
        <Video mediaUrlWebm={mediaUrlWebm} mediaUrlMp4={mediaUrl} />
      </div>
      <div className={classes.CardInfoWrapper}>{children}</div>
    </div>
  );
});

export default Card;
