import TraitsPage from "../components/Pages/Traits/TraitsPage";
import { getAllCategories } from "../utils/utils";
import SEO from "../components/SEO/SEO";

const traits = ({ categories }) => {
  return (
    <>
      <SEO title="Traits" />
      <TraitsPage categories={categories} />
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/traits"
  );
  const data = await res.json();
  const categories = getAllCategories(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories: categories,
    },
    revalidate: 1,
  };
}

export default traits;
