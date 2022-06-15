import Hero from "../../Layout/Hero/Hero";
import useWallet from "../../hooks/useWallet";
import Button from "../../UI/Button";
import DiamondBgSvg from "../../../assets/images/DiamondBgSvg";
import Info from "./Info/Info";
import { useState, useEffect } from "react";
import Collection from "./Collection/Collection";
import useMousePosition from "../../hooks/useMousePosition";
import classes from "./HomePage.module.css";

const HomePage = ({ diamonds, pageData }) => {
  const { hero_switch, slices, unique } = pageData;
  const { isConnected, setConnectionHandler, removeConnectionHandler } =
    useWallet();
  const { x, y } = useMousePosition();
  const [activeTab, setActiveTab] = useState(0);
  const [animation, updateAnimation] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      let active = activeTab + 1;
      if (active > 2) {
        active = 0;
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

  return (
    <>
      {slices.map((slice, index) => {
        return (
          <div
            className={`${
              activeTab === index ? "animate-hero-open" : "animate-hero-closed"
            }`}
            key={slice.id}
          >
            <Hero
              title={slice.title}
              image={slice.image.data.attributes.url}
              page="homepage"
              alt="hero-image"
            >
              <p>{slice.description}</p>
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
              </div>
            </Hero>
            <div className="container switch-container">
              <div className={classes.SwitchWrapper}>
                {hero_switch.map((hSwitch, i) => {
                  return (
                    <DiamondBgSvg
                      key={hSwitch.id}
                      id={i}
                      img={hSwitch.image.data[0].attributes.url}
                      setActive={() => {
                        setActiveTab(i);
                      }}
                      activeTab={activeTab}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <Info unique={unique} x={x} y={y} />
      <Collection diamonds={diamonds} />
    </>
  );
};

export default HomePage;
