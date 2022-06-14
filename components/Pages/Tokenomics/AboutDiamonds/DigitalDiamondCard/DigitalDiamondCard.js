import Image from "next/image";

const DigitalDiamondCard = ({ title, description, image }) => {
  return (
    <div>
      <div>
        <Image
          src={image.data.attributes.url}
          width={64}
          height={64}
          alt="card-image"
        />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default DigitalDiamondCard;
