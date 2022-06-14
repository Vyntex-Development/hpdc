import classes from "./Info.module.css";
import NftCard from "../../../../assets/images/nft-card.png";
import Image from "next/image";
import HoverableImage from "../../../../assets/images/hoverable-diamond.png";

const Info = ({ x, y }) => {
  return (
    <div className={`${classes.Info} container`}>
      <div>
        <div>
          <span>Each diamond has </span>
          <span id="unique">
            unique traits
            <span style={{ transform: `translate(${x}px, ${y}px)` }}>
              <Image
                id="image"
                width={200}
                height={200}
                alt="diamond-card"
                objectFit="contain"
                src={HoverableImage.src}
              />
            </span>
          </span>
          <span> that make every piece of them 100% unique.</span>
        </div>
      </div>
      <div>
        <Image
          src={NftCard.src}
          width={721}
          height={721}
          alt="nft-card"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Info;
