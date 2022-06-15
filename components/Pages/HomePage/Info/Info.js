import classes from "./Info.module.css";
import Image from "next/image";

const Info = ({ x, y, unique }) => {
  console.log(unique);
  const { image, moving_image, description } = unique;
  const [paragraphTextFirst, spanText, paragraphTextLast] =
    description.split("<>");
  return (
    <div className={`${classes.Info} container`}>
      <div>
        <div>
          <span>{paragraphTextFirst}</span>
          <span id="unique">
            {spanText}
            <span style={{ transform: `translate(${x}px, ${y}px)` }}>
              <Image
                id="image"
                width={200}
                height={200}
                alt="diamond-card"
                objectFit="contain"
                src={moving_image.data.attributes.url}
              />
            </span>
          </span>
          <span> {paragraphTextLast}</span>
        </div>
      </div>
      <div>
        <Image
          src={image.data.attributes.url}
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
