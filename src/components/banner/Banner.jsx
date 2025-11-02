import { FiSearch } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] w-full h-full">
      <div className="bg-two-sides h-full">
      
        <div className="flex flex-col justify-center items-center h-full space-y-4 py-16">
          <h1 className="text-center font-bold text-5xl">
            Deal your <span className="text-primary">Products</span> <br /> in a{" "}
            <span className="text-primary">Smart</span> way !
          </h1>
          <p className="text-[#627382]">
            SmartDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </p>

          <label className="w-full flex justify-center mt-4">
            <input type="search" required placeholder="search For Products, Categoriees..." className="input rounded-none rounded-l-4xl shadow-2xl shadow-black/30"/>
            <button className="btn btn-primary rounded-none shadow-2xl shadow-black/30 rounded-r-4xl"><FiSearch size="24px" /></button>
          </label>

          <span>
           <button className="btn btn-primary mr-4">
              Watch All Products
            </button>
            <button className="btn text-primary bg-none border-primary">
              Post an Product
            </button>
          </span>

        </div>
      </div>
    </div>
  );
};

export default Banner;
