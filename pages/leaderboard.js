import LeaderboardPage from "../components/Pages/Leaderboard/LeaderboardPage";
import SEO from "../components/SEO/SEO";
import { client } from "../utils/utils";
const leaderBoard = ({ data }) => {
  const { slices } = data.pageData.attributes;
  return (
    <>
      <SEO title="Leaderboard" />
      <LeaderboardPage data={data} slices={slices} />;
    </>
  );
};

export async function getStaticProps() {
  let [data, data1, data2, data3, { data: pageData }] = await Promise.all([
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=6"
    ),
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds/count"
    ),
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:ASC&_limit=1"
    ),
    await client.request(
      "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=1"
    ),

    await client.request(
      "https://lionfish-app-zi95r.ondigitalocean.app/api/leaderboard?populate=slices.image"
    ),
  ]);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        diamonds: data,
        min: data2,
        max: data3,
        count: data1,
        pageData,
      },
    },
    revalidate: 300,
  };
}

export default leaderBoard;
