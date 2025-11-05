import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [myBids, setMyBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Authorization using manually genarate token
  // useEffect(() => {
  //   fetch(`https://smart-deals-server-beige.vercel.app/bids?email=${user.email}`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const sortedData = data.sort((a, b) => b.bid_price - a.bid_price);
  //       setMyBids(sortedData);
  //     });
  // }, [user]);

  // Using Firebase
  //   useEffect(() => {
  //   fetch(`https://smart-deals-server-beige.vercel.app/bids?email=${user.email}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const sortedData = data.sort((a, b) => b.bid_price - a.bid_price);
  //       setMyBids(sortedData);
  //     });
  // }, [user]);

  useEffect(() => {
    axiosSecure.get(`/bids?email=${user.email}`).then((data) => {
      const sortedData = data.data.sort((a, b) => b.bid_price - a.bid_price);
      setMyBids(sortedData);
    });
  });

  const handlDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-server-beige.vercel.app/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const filteredData = myBids.filter((bid) => bid._id != _id);
              setMyBids(filteredData);
            }
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-gray-100 py-8">
      <div className="w-10/12 mx-auto">
        <h1 className="text-3xl font-bold mt-10 mb-6">
          My Bids: <span className="text-primary">{myBids.length}</span>
        </h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {myBids.map((bid, index) => {
              return (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={image}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div> */}
                      <div>
                        <div className="font-bold">Product Name</div>
                        <div className="text-sm opacity-50">Price: Tk</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Seller Name
                    <br />
                    <span className="text-xs opacity-50">Email: </span>
                  </td>
                  <td>{bid.bid_price} Tk</td>
                  <td>
                    <span
                      className={`badge ${
                        bid.status === "pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </td>
                  <th>
                    <button
                      onClick={() => handlDeleteBid(bid._id)}
                      className="btn btn-outline text-red-600 btn-xs ml-2"
                    >
                      Remove bid
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
