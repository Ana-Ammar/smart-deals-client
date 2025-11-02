import React, { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";

const Modal = ({ product, setBids, bids }) => {
  const { user } = useContext(AuthContext);

  const id = product._id;

  const handleSubmitBid = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bidPrice = e.target.price.value;
    const newBid = {
      product: id,
      buyer_name: name,
      buyer_email: email,
      bid_price: bidPrice,
      status: "pending",
    };

    fetch("http://localhost:5165/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setBids([...bids, newBid]);
          const modal = document.getElementById("my_modal_1")
          modal.close()
          e.target.reset()
        }
      });
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("my_modal_1")
    modal.close()
  }
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <div className="modal-action flex flex-col " method="dialog">
            <h2 className="text-center text-xl font-semibold mb-6">
              Give Seller Your Offered Price
            </h2>
            <form onSubmit={handleSubmitBid} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <label className="label-text text-sm">
                  Your Name
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.displayName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="label-text text-sm">
                  Your Email
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              {/* Row 2 */}
              <label className="label-text text-sm">
                Give your offer
                <input
                  type="text"
                  name="price"
                  placeholder="Tk.."
                  className="input input-bordered w-full"
                  required
                />
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2 mt-4">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  <MdCancel size={18} />
                  Close
                </button>
                <button
                  type="submit"
                  className="btn bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <FaPaperPlane size={16} />
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
