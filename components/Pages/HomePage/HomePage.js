import Hero from "../../Layout/Hero/Hero";
import HeroImage from "../../../assets/images/home-hero.png";
import TabImg1 from "../../../assets/images/hero-diamond-1.png";
import TabImg2 from "../../../assets/images/hero-diamond-2.png";
import TabImg3 from "../../../assets/images/hero-diamond-3.png";
import useWallet from "../../hooks/useWallet";
import Button from "../../UI/Button";
import DiamondBgSvg from "../../../assets/images/DiamondBgSvg";
import Info from "./Info/Info";
import { useState, useEffect } from "react";
import Collection from "./Collection/Collection";
import useMousePosition from "../../hooks/useMousePosition";

const HomePage = ({ diamonds }) => {
  const { isConnected, setConnectionHandler, removeConnectionHandler } =
    useWallet();
  const { x, y } = useMousePosition();
  const [activeTab, setActiveTab] = useState(1);
  const [animation, updateAnimation] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      let active = activeTab + 1;
      if (active > 3) {
        active = 1;
      }
      setActiveTab(active);
      updateAnimation(true);
    }, 6000);

    return () => clearInterval(id);
  }, [activeTab]);

  const connect = () => {
    if (isConnected) {
      removeConnectionHandler();
      return;
    }
    setConnectionHandler();
  };

  const mint = (ev) => {
    alert("Minting");
  };

  const connectWalletHandlerAndMint = () => {
    setConnectionHandler("connectAndMint");
    alert("Connected, so you can mint");
  };

  let title;

  if (activeTab === 1) {
    title = "Title 1";
  }
  if (activeTab === 2) {
    title = "Title 2";
  }
  if (activeTab === 3) {
    title = "Title 3";
  }

  return (
    <>
      <Hero
        title={title}
        image={HeroImage.src}
        page="homepage"
        alt="hero-image"
      >
        <p>
          A collection of 10,000 unique algorithmically generated digital
          diamonds stored on the Solana blockchain.
        </p>
        <div>
          <Button onClick={connect} type="blue">
            {!isConnected ? "Connect Wallet" : "Disconnect Wallet"}{" "}
          </Button>
          <Button
            onClick={() => {
              !isConnected ? connectWalletHandlerAndMint() : mint();
            }}
            type="transparent"
          >
            Mint diamond
          </Button>
          <div>
            <DiamondBgSvg
              id={1}
              img={TabImg1}
              setActive={(id) => {
                setActiveTab(id);
              }}
              activeTab={activeTab}
            />
            <DiamondBgSvg
              id={2}
              img={TabImg2}
              setActive={(id) => {
                setActiveTab(id);
              }}
              activeTab={activeTab}
            />
            <DiamondBgSvg
              id={3}
              img={TabImg3}
              setActive={(id) => {
                setActiveTab(id);
              }}
              activeTab={activeTab}
            />
          </div>
        </div>
      </Hero>
      <Info x={x} y={y} />
      <Collection diamonds={diamonds} />
    </>
  );
};

export default HomePage;
