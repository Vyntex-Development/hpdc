import GalleryPage from "../components/Pages/Gallery/GalleryPage";
import SEO from "../components/SEO/SEO";

const gallery = ({ data }) => {
  console.log(data);
  return (
    <>
      <SEO title="Gallery" />
      <GalleryPage data={data} />
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/filtration-fields"
  );
  const data = await res.json();
  const res1 = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=id:ASC&_limit=6"
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds/count"
  );
  const data2 = await res2.json();

  if (!data || !data1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        filtration_fields: data,
        diamonds: data1,
        count: data2,
      },
    },
    revalidate: 1,
  };
}

export default gallery;
