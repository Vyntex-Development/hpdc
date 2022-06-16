import classes from "./TraitsStats.module.css";
import Image from "next/image";

const TraitsStats = ({ statistic }) => {
  const {
    title,
    description,
    image,
    image_second,
    image_third,
    statistic_image,
    stats,
  } = statistic;
  return (
    <div className={classes.TraitsStatsWrapper}>
      <div className={classes.DiamondImage}>
        <div className={classes.CircleImageWrapper}>
          <Image
            src={image_second.data.attributes.url}
            alt="diamond-circle-image"
            width={582}
            height={438}
            objectFit="contain"
          />
        </div>
        <div className={classes.DiamondImageWrapper}>
          <Image
            src={image.data.attributes.url}
            alt="diamond-image"
            width={382}
            height={338}
            objectFit="contain"
          />
        </div>
        <div className={classes.DustImageWrapper}>
          <Image
            src={image_third.data.attributes.url}
            alt="dust-image"
            width={802}
            height={538}
            objectFit="contain"
          />
        </div>
      </div>
      <div className="container">
        <div className={classes.TraitsStats}>
          <div className={classes.Stats}>
            <h2>{title}</h2>
            <p className={classes.Paragraph}>{description}</p>
            <div className={classes.StatImageWrapper}>
              <ul className={classes.ChartWrapper}>
                {stats.map(({ name, value, id }) => {
                  return (
                    <li key={id}>
                      <span className={classes.StatsInfo}>
                        <span>{name}</span>
                        <span>{value}</span>
                      </span>
                      <span className={classes.Bar}>
                        <span
                          style={{ width: `${value}` }}
                          className={classes.BarFill}
                        ></span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Image
                src={statistic_image.data.attributes.url}
                alt="grid-image"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraitsStats;
