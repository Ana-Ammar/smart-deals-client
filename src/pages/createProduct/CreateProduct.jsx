import { useState } from "react";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxios from "../../hooks/useAxios";

const CreateProduct = () => {
  const [condition, setCondition] = useState("brandnew");
  const [category, setCategory] = useState();
  const { user } = useAuth();
  // const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure()

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const min_price = e.target.min_price.value;
    const max_price = e.target.max_price.value;
    const image = e.target.image.value;
    const seller_name = e.target.seller_name.value;
    const email = e.target.email.value;
    const seller_contact = e.target.seller_contact.value;
    const usage = e.target.usage.value;
    const location = e.target.location.value;
    const description = e.target.description.value;

    const newProduct = {
      title,
      min_price,
      max_price,
      image,
      category,
      seller_name,
      seller_contact,
      email,
      usage,
      location,
      description,
    };

    // axios.post("https://smart-deals-server-beige.vercel.app/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Product created succesfully",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     e.target.reset()
    //   }
    // });

      axiosSecure.post("products", newProduct).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product created succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset()
      }
    });

  };

  return (
    <div className="my-8">
      {/* Back Button */}
      <Link
        to="/"
        className="flex items-center gap-2 justify-center text-sm mb-4 text-gray-600 hover:text-black"
      >
        <FaArrowLeft /> Back To Products
      </Link>

      <h1 className="text-center font-bold text-5xl">
        Create <span className="text-primary">A Product</span>
      </h1>
      <div className="max-w-4xl mx-auto p-6 border rounded-xl shadow-md bg-white mt-6">
        <form onSubmit={handleCreateProduct} className="space-y-4">
          {/* Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Yamaha Fz Guitar for Sale"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered w-full appearance-none"
                >
                  <option disabled selected>
                    Select a Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Musical Instruments">
                    Musical Instruments
                  </option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Others">Others</option>
                </select>
                <FaChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Min Price You want to Sale</label>
              <input
                type="number"
                name="min_price"
                placeholder="e.g. 200"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Max Price You want to Sale</label>
              <input
                type="number"
                name="max_price"
                placeholder="e.g. 400"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Product Condition + Usage Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-1">
                Product Condition
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    className="radio"
                    checked={condition === "brandnew"}
                    onChange={() => setCondition("brandnew")}
                  />{" "}
                  Brand New
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    className="radio"
                    checked={condition === "used"}
                    onChange={() => setCondition("used")}
                  />
                  Used
                </label>
              </div>
            </div>
            <div>
              <label className="font-medium">Product Usage Time</label>
              <input
                type="text"
                name="usage"
                placeholder="e.g. 1 year 3 month"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Product Image URL */}
          <div>
            <label className="font-medium">Your Product Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              className="input input-bordered w-full"
            />
          </div>

          {/* Seller Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Seller Name</label>
              <input
                type="text"
                name="seller_name"
                defaultValue={user.displayName}
                placeholder="e.g. Artisan Roasters"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Seller Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="e.g. leli31955@nrlord.com"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Seller Contact</label>
              <input
                type="text"
                name="seller_contact"
                placeholder="e.g. +1-555-1234"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Seller Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="font-medium">
              Simple Description about your Product
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full h-28"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..."
            ></textarea>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-full text-white text-lg col-span-2">
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
