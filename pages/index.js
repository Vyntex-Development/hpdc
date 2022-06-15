import SEO from "../components/SEO/SEO";
import HomePage from "../components/Pages/HomePage/HomePage";
import { client } from "../utils/utils";

export default function index({ diamonds, pageData }) {
  return (
    <>
      <SEO title="HPDC" />
      <HomePage diamonds={diamonds} pageData={pageData.attributes} />
    </>
  );
}

export async function getStaticProps(context) {
  let [diamonds, { data: pageData }] = await Promise.all([
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=6"
    ),
    await client.request(
      "https://lionfish-app-zi95r.ondigitalocean.app/api/homepage?populate%5B0%5D=slices.image&populate%5B1%5D=hero_switch.image&populate%5B2%5D=unique.image&populate%5B3%5D=unique.moving_image"
    ),
  ]);

  if (!diamonds || !pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      diamonds,
      pageData,
    },
    revalidate: 300,
  };
}
