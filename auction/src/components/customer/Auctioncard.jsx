import React from "react";
import { useState } from "react";
import axios from "axios";

const Auctioncard = ({
  imagelink,
  carname,
  details,
  startbid,
  placebid = true,
  timer,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [tranxd, setTrnxd] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const userEmail = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

  const userName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : "";
  console.log(userEmail);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitBid = async () => {
    // Uncomment and use validation if needed
    // if (bidPrice.trim() === '') {
    //   alert('Please enter a bid amount.');
    //   return;
    // }
    // if (tranxd.trim() === '') {
    //   alert('Please enter a transaction id');
    //   return;
    // }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/auctoin/bid/${id}`,
        {
          email: userEmail,
          trxnid: tranxd,
          bidderName: userName,
          bidAmount: bidPrice,
        }
      );

      // Handle response here if needed
      // console.log(response.data);

      alert(`Bid submitted! Price: ${bidPrice}`);
    } catch (err) {
      // Make sure setError is defined and properly handles the error
      setError(err.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
      return; // Return here to prevent further execution in case of error
    }

    // These should only run if the try block is successful
    closeModal();
    setBidPrice("");
    setTrnxd("");
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ">
        <div className="relative">
          <img className="rounded-t-lg" src={imagelink} alt="car" />
          <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <span id="timer">{timer}</span>
          </div>
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {carname}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {details}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Bid start at <b className="text-white">BDT {startbid}</b>
          </p>

          {/* Add a button to trigger the modal */}
          {placebid && (
            <button
              onClick={openModal}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Place BID
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          )}
        </div>

        {/* The modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              {/* Modal panel */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white p-4">
                  <h1 className="text-lg font-medium text-gray-900">
                    Car Details
                  </h1>
                  <p className="mb-2">Registration: 2022</p>
                  <p className="mb-2">Engine Size: 2.6L</p>

                  {/* Add more details as needed */}
                  <h1 className="text-lg font-medium text-gray-900 mt-4">
                    Enter your bidding price:
                  </h1>
                  <input
                    required
                    type="text"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder="Enter your bid"
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <h1 className="text-lg font-medium text-gray-900 mt-4">
                    Please pay BDT 1000 through Bkash at 01727260141:
                  </h1>
                  <input
                    required
                    type="text"
                    value={tranxd}
                    onChange={(e) => setTrnxd(e.target.value)}
                    placeholder="Enter trnxd id"
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={submitBid}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Submit Bid
                    </button>
                    <button
                      onClick={closeModal}
                      className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Auctioncard;
