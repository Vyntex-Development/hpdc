import TokenomicsPage from "../components/Pages/Tokenomics/TokenomicsPage";
import SEO from "../components/SEO/SEO";

const tokenomics = ({ attributes }) => {
  return (
    <>
      <SEO title="Tokenomics" />
      <TokenomicsPage slices={attributes.slices} />
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://lionfish-app-zi95r.ondigitalocean.app/api/tokenomic?populate%5B0%5D=slices.hero&populate%5B1%5D=slices.image&populate%5B2%5D=slices.card.image&populate%5B3%5D=slices.card.description&populate%5B4%5D=slices.paragraph&populate%5B5%5D=slices.dropdown"
  );
  const { data } = await response.json();
  return {
    props: data,
    revalidate: 100,
  };
}

export default tokenomics;
