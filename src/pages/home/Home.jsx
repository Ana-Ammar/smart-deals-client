import Banner from "../../components/banner/Banner";
import LatestProduct from "./LatestProduct";

const latestProductPromise = fetch("http://localhost:5165/latest-product").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestProduct
        latestProductPromise={latestProductPromise}
      ></LatestProduct>
    </div>
  );
};

export default Home;
