import Hero from "../../Layout/Hero/Hero";
import TraitsImage from "../../../assets/images/traits-hero-image.png";
import Categories from "./Categories/Categories";
import TraitsStats from "../Traits/Stats/TraitsStats";
const TraitsPage = ({ categories }) => {
  return (
    <>
      <Hero title="TRAITS" image={TraitsImage.src} page="traits">
        <p>
          Mint unique algorithmically generated digital diamonds with
          <span> proof of ownership</span> stored on the Solana blockchain.
        </p>
      </Hero>
      <Categories categories={categories} />
      <TraitsStats />
    </>
  );
};

export default TraitsPage;
