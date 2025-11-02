import React from "react";

const BidsTable = ({ bids, product }) => {
  const { _id, title, price_min, price_max, seller_name, email } = product;

  return (
    <div className="overflow-x-auto bg-gray-100 py-8">
      <div className="w-10/12 mx-auto">
        <h1 className="text-3xl font-bold mt-10 mb-6">Bids for this product: <span className="text-primary">{bids.length}</span></h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>SL No.</label>
              </th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bids.map((bid, index) => {
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
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">
                          Price: {price_min} - {price_max} Tk
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {seller_name}
                    <br />
                    <span className="text-xs opacity-50">Email: {email}</span>
                  </td>
                  <td>{bid.bid_price} Tk</td>
                  <th>
                    <button className="btn btn-outline text-green-600 btn-xs">
                      Accept offer
                    </button>
                    <button className="btn btn-outline text-red-600 btn-xs ml-2">
                      Reject offer
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

export default BidsTable;
