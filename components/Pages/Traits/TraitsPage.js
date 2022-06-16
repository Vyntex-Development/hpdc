import Hero from "../../Layout/Hero/Hero";
import Categories from "./Categories/Categories";
import TraitsStats from "../Traits/Stats/TraitsStats";
const TraitsPage = ({ categories, pageData }) => {
  const [hero, slider, statistic] = pageData.attributes.slices;
  const { title, description, image } = hero;
  const [paragraphStart, span, paragraphEnd] = description.split("<>");
  return (
    <>
      <Hero title={title} image={image.data.attributes.url} page="traits">
        <p>
          {paragraphStart}
          <span>{span}</span>
          {paragraphEnd}
        </p>
      </Hero>
      <Categories categories={categories} slider={slider} />
      <TraitsStats statistic={statistic} />
    </>
  );
};

export default TraitsPage;
