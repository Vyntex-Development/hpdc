import classes from "./Card.module.css";
import Video from "./Video";
import React from "react";

const Card = React.forwardRef((props, ref) => {
  const { mediaUrl, mediaUrlWebm, children } = props;
  return (
    <div className={classes.Card} ref={ref}>
      <div className={classes.CardVideoWrapper}>
        <Video mediaUrlWebm={mediaUrlWebm} mediaUrlMp4={mediaUrl} />
      </div>
      <div className={classes.CardInfoWrapper}>{children}</div>
    </div>
  );
});

export default Card;
