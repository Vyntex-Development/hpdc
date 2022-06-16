import TraitsPage from "../components/Pages/Traits/TraitsPage";
import { getAllCategories } from "../utils/utils";
import { client } from "../utils/utils";
import SEO from "../components/SEO/SEO";

const traits = ({ categories, pageData }) => {
  return (
    <>
      <SEO title="Traits" />
      <TraitsPage categories={categories} pageData={pageData} />
    </>
  );
};

export async function getStaticProps(context) {
  let [data, { data: pageData }] = await Promise.all([
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/traits"
    ),
    await client.request(
      "https://lionfish-app-zi95r.ondigitalocean.app/api/trait?populate%5B0%5D=slices.hero&populate%5B1%5D=slices.image&populate%5B2%5D=slices.choice&populate%5B3%5D=slices.stats&populate%5B4%5D=slices.image_second&populate%5B5%5D=slices.image_third&populate%5B6%5D=slices.statistic_image"
    ),
  ]);

  const categories = getAllCategories(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories: categories,
      pageData,
    },
    revalidate: 1,
  };
}

export default traits;
