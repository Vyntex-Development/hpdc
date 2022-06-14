import Image from "next/image";

const DiamondBgSvg = ({ img, id, setActive, activeTab }) => {
  const setActiveTab = (_, id) => {
    setActive(id);
  };

  return (
    <div
      className={`${activeTab === id ? "active-tab" : ""} tab`}
      onClick={(ev) => setActiveTab(ev, id)}
    >
      <svg
        className={activeTab === id ? "animate-svg" : ""}
        width="100"
        height="65"
        viewBox="0 0 100 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.0467 1L2 17.0746L48.9787 63L98 17.0746L79.617 1H19.0467Z"
          fill="#09090D"
        />
      </svg>
      <Image src={img.src} width={72} height={46} alt="hero-tab-img" />
    </div>
  );
};

export default DiamondBgSvg;
