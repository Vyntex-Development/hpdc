import SEO from "../components/SEO/SEO";
import HomePage from "../components/Pages/HomePage/HomePage";

export default function index({ diamonds }) {
  return (
    <>
      <SEO title="HPDC" />
      <HomePage diamonds={diamonds} />
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=6"
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      diamonds: data,
    },
    revalidate: 300,
  };
}
