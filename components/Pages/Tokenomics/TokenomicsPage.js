import Hero from "../../Layout/Hero/Hero";
import Button from "../../UI/Button";
import GemzTokens from "./Gemztokens/Gemztokens";
import AboutDiamonds from "./AboutDiamonds/AboutDiamonds";
import Stats from "./Stats/Stats";
import Earnings from "./Earnings/Earnings";
import useWallet from "../../hooks/useWallet";

const TokenomicsPage = ({ slices }) => {
  const [hero, gemzTokens, aboutDiamonds, tokenomics, earnings] = slices;
  const { title, description, image } = hero;
  const { isConnected, setConnectionHandler, removeConnectionHandler } =
    useWallet();

  const connect = () => {
    if (isConnected) {
      removeConnectionHandler();
      return;
    }
    setConnectionHandler();
  };

  const mint = () => {
    alert("Minting");
  };

  const connectWalletHandlerAndMint = () => {
    setConnectionHandler("connectAndMint");
    alert("Connected, so you can mint");
  };

  return (
    <>
      <Hero
        title={title}
        image={image.data.attributes.url}
        page="tokenomics"
        alt="hero-image"
      >
        <p>{description}</p>
        <div>
          <Button onClick={connect} type="blue">
            {!isConnected ? "Connect Wallet" : "Disconnect Wallet"}
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
      <GemzTokens gemzTokens={gemzTokens} />
      <AboutDiamonds aboutDiamonds={aboutDiamonds} />
      <Stats tokenomics={tokenomics} />
      <Earnings earnings={earnings} />
    </>
  );
};

export default TokenomicsPage;
