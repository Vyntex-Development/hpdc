import classes from "./TraitsStats.module.css";
import Image from "next/image";
import StatsGridImage from "../../../../assets/images/stats-grid-image.png";
import Diamond from "../../../../assets/images/diamond.png";
import Dust from "../../../../assets/images/dust.png";
import DiamondCircle from "../../../../assets/images/diamond-circle.png";
import { stats } from "../../../../utils/utils";

const TraitsStats = () => {
  return (
    <div className={classes.TraitsStatsWrapper}>
      <div className={classes.DiamondImage}>
        <div className={classes.CircleImageWrapper}>
          <Image
            src={DiamondCircle.src}
            alt="diamond-circle-image"
            width={582}
            height={438}
            objectFit="contain"
          />
        </div>
        <div className={classes.DiamondImageWrapper}>
          <Image
            src={Diamond.src}
            alt="diamond-image"
            width={382}
            height={338}
            objectFit="contain"
          />
        </div>
        <div className={classes.DustImageWrapper}>
          <Image
            src={Dust.src}
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
            <h2>Rarity</h2>
            <p className={classes.Paragraph}>
              Each diamond has its own rarity score based on the chance of being
              generated through the algorithm..
            </p>
            <div className={classes.StatImageWrapper}>
              <ul className={classes.ChartWrapper}>
                {stats.map(({ name, stat, id }) => {
                  return (
                    <li key={id}>
                      <span className={classes.StatsInfo}>
                        <span>{name}</span>
                        <span>{stat}</span>
                      </span>
                      <span className={classes.Bar}>
                        <span
                          style={{ width: `${stat}` }}
                          className={classes.BarFill}
                        ></span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Image
                src={StatsGridImage.src}
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
