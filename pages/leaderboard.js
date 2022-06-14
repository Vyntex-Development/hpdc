import LeaderboardPage from "../components/Pages/Leaderboard/LeaderboardPage";
import SEO from "../components/SEO/SEO";

const leaderBoard = ({ data }) => {
  return (
    <>
      <SEO title="Leaderboard" />
      <LeaderboardPage data={data} />;
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=6"
  );
  const data = await res.json();

  const res1 = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds/count"
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:ASC&_limit=1"
  );
  const data2 = await res2.json();

  const res3 = await fetch(
    "https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:DESC&_limit=1"
  );
  const data3 = await res3.json();

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
      },
    },
    revalidate: 300,
  };
}

export default leaderBoard;
