import { Link, useLoaderData } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import BidsTable from "./BidsTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure()


  const {
    _id,
    title,
    image,
    usage,
    description,
    category,
    price_min,
    price_max,
    created_at,
    seller_name,
    location,
    email,
    status,
    seller_contact,
  } = product;

  useEffect(() => {
    axiosSecure.get(`/products/bids/${_id}`)
    .then(data => setBids(data.data))
  }, [_id, axiosSecure]);


  // useEffect(() => {
  //   fetch(`https://smart-deals-server-beige.vercel.app/products/bids/${_id}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBids(data));
  // }, [_id, user]);

  const handleModalOpen = () => {
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
  };

  return (
    <div>
      <div className="bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-10/12 mx-auto">
          {/* Left Section: Image + Description */}
          <div className="flex flex-col justify-center">
            <div className="w-full rounded-xl mb-4">
              <img
                src={image}
                className="rounded-2xl object-cover w-full"
              ></img>
            </div>
            <div className="bg-white shadow-md rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-3">
                Product Description
              </h2>

              <div className="flex justify-between text-sm mb-3">
                <p className="text-primary">
                  <span className="font-semibold">Condition:</span> New
                </p>
                <p className="text-primary">
                  <span className="font-semibold">Usage Time:</span> {usage}
                </p>
              </div>

              <p className="text-sm text-gray-600 leading-6">{description}</p>
            </div>
          </div>

          {/* Right Section: Product & Seller Info */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm mb-4 text-gray-600 hover:text-black"
            >
              <FaArrowLeft /> Back To Products
            </Link>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <span className="badge badge-outline mb-4">{category}</span>

            {/* Price Card */}
            <div className="bg-white shadow-md rounded-xl p-5 mb-6">
              <p className="text-2xl font-bold text-green-600">
                ৳ {price_min} - {price_max}
              </p>
              <p className="text-xs text-gray-400">Price starts from</p>
            </div>
            {/* Product Details */}
            <div className="bg-white shadow-md rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <p>
                <span className="font-semibold">Product ID:</span> {_id}
              </p>
              <p>
                <span className="font-semibold">Posted:</span> {created_at}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-white shadow-md rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-3">Seller Information</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-semibold">{seller_name}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Contact:</span> {seller_contact}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="badge badge-success ml-1">{status}</span>
              </p>
            </div>

            {/* Button */}
            <button
              onClick={handleModalOpen}
              className="btn btn-primary w-full text-lg rounded-xl"
            >
              I Want Buy This Product
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal product={product} bids={bids} setBids={setBids}></Modal>

      {/* Product's bids */}
      <BidsTable bids={bids} product={product}></BidsTable>
    </div>
  );
};

export default ProductDetails;
