import GalleryPage from "../components/Pages/Gallery/GalleryPage";
import SEO from "../components/SEO/SEO";
import { client } from "../utils/utils";

const gallery = ({ data }) => {
  const { slices } = data.pageData.attributes;
  return (
    <>
      <SEO title="Gallery" />
      <GalleryPage data={data} slices={slices} />
    </>
  );
};

export async function getStaticProps() {
  let [data, data1, data2, { data: pageData }] = await Promise.all([
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/filtration-fields"
    ),
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=id:ASC&_limit=6"
    ),
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds/count"
    ),
    await client.request(
      "https://lionfish-app-zi95r.ondigitalocean.app/api/gallery?populate=slices.image"
    ),
  ]);

  if (!data || !data1 || !data2) {
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
        pageData,
      },
    },
    revalidate: 1,
  };
}

export default gallery;
