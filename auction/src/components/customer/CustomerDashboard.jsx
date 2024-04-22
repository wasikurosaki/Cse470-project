import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Auctioncard from "./Auctioncard";
import Auctoinform from "./Auctoinform";
import axios from "axios";
const CustomerDashboard = () => {
  function checkUserLoggedIn() {
    const token = localStorage.getItem("token");
    let userLoggedIn = false;

    if (token) {
      userLoggedIn = true;
    }

    return userLoggedIn;
  }
  const userLoggedIn = checkUserLoggedIn();

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

  const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [refresh, setRefrsh] = useState();
  const [usercardata, setUsercardata] = useState();
  const [issue, setIssue] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auctoin/getallauctoin"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately
    }
  };
  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/auctoin/${userEmail}`
      );
      setUsercardata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }

    fetchData();
    fetchuserData();
  }, []);

  console.log(data);
  console.log(usercardata);

  const [bidPrice, setBidPrice] = useState("");
  const [tranxd, setTrnxd] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitBid = () => {
    // Add your logic to handle the bid submission
    if (bidPrice.trim() === "") {
      alert("Please enter a bid amount.");
      return;
    }
    if (tranxd.trim() === "") {
      alert("Please enter a transaction id");
      return;
    }
    if (bidPrice.trim() === "") {
      alert("Please enter a bid amount.");
      return;
    }

    alert(`Bid submitted! Price: ${bidPrice}`);
    closeModal();
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Handle search button click
  const handleSearch = () => {
    // Perform search logic with the searchTerm
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/make/report`,
        {
          email: userEmail,
          name: JSON.parse(localStorage.getItem("user")).name,
          message: issue,
        }
      );
      console.log(response.data);

      // Assuming bidPrice is a state or prop that holds the bid price
      // Update this alert message based on your application's context
      alert("Report submitted successfully!");
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Failed to submit report.");
    }
  };
  const buttonStyle = {
    animation:
      usercardata?.length === 0 ? "" : "shake 0.5s ease-in-out infinite",
  };

  const redirectToWhatsApp = () => {
    // Replace 'whatsappphonenumber' with the actual WhatsApp phone number
    // including the country code but without any leading zeros, brackets, or dashes.
    const phoneNumber = "+8801727260141";
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    // Redirect the user to the WhatsApp URL
    window.location.href = whatsappUrl;
  };

  function changeStatus(obj_id) {
    console.log(obj_id);
    axios
      .get(`http://localhost:3001/api/auctoin/bid/pay/${obj_id}`)
      .then((response) => {
        console.log("Success:", response.data);
        // Reload the page after the request is successful
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <>
      <div className=" flex flex-row justify-between ml-5  mt-10 relative">
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
        <p className=" font-semibold md:text-2xl text-lg ">On Going Auctions</p>
        <button
          className={`rounded shadow-sm text-white ${
            usercardata?.length === 0
              ? "bg-gray-800 hover:bg-gray-900"
              : "bg-red-700 hover:bg-red-900"
          } mr-4 mb-4`}
          style={buttonStyle}
          onClick={openModal}
        >
          Show Notification
        </button>
        <button
          className="rounded-full mr-4 mb-4 fixed right-0 bottom-0 z-100000"
          onClick={redirectToWhatsApp}
        >
          Contact
        </button>
      </div>

      <div className="flex items-center mt-3 ml-5">
        <input
          type="text"
          className="px-3 py-2 border rounded-md mr-2"
          placeholder="Name of the car"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap mx-5 mt-10 gap-24 overflow-auto">
        {data?.map(
          (item, index) =>
            item.email !== userEmail && ( // Conditional rendering based on email match
              <Auctioncard
                key={index} // Assuming each item has a unique 'id'. If not, use 'index'.
                imagelink={item.image}
                carname={item.carName}
                details={`${item.modelYear} ${item.modelName}, ${item.details}`}
                startbid={item.startingPrice}
                id={item._id}
                // timer={/* logic to calculate remaining time based on item.auctionEndTime */}
              />
            )
        )}
      </div>

      <div className="ml-5 font-semibold my-10 md:text-2xl text-xl relative">
        Auctoin Your Car
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>

      <div className="flex justify-center bg-gray-900 rounded-[50px] shadow-lg md:mx-0 mx-5">
        <Auctoinform />
      </div>

      <div className="ml-5 font-semibold my-10 md:text-2xl text-xl relative">
        My Auctions
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>

      <div className="flex flex-wrap mx-5 mt-10 gap-24 overflow-auto  ">
        {usercardata?.map((item, index) => (
          <Auctioncard
            key={index} // Assuming each item has a unique 'id'. If not, use 'index'.
            imagelink={item.image}
            carname={item.carName}
            details={`${item.modelYear} ${item.modelName}, ${item.details}`}
            startbid={item.startingPrice}
            placebid={false}
            id={item._id}
            // timer={/* logic to calculate remaining time based on item.auctionEndTime */}
          />
        ))}
      </div>

      <div className="ml-5 font-semibold my-10 text-2xl relative">
        My Bids
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>
      <div className=" flex flex-wrap mx-5 my-10 gap-24 overflow-auto">
        <table id="bookingTable" className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                ID
              </th>

              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Car Model{" "}
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Owner's Email
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Placed Bid
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item1) =>
              item1.bidders?.map(
                (item2, index) =>
                  item2.bidderEmail === userEmail && ( // Conditional rendering
                    <tr key={index}>
                      <td className="pt-2">{index + 1}</td>
                      <td className="pt-2">{item1.modelName}</td>
                      <td className="pt-2">{item2.bidderEmail}</td>
                      <td className="pt-2">
                        <b>{item2.bidAmount}</b>
                      </td>
                      <td className="pt-2 flex justify-center">
                        <button className="rounded shadow-sm bg-yellow-300 text-black">
                          Pending
                        </button>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="ml-5 font-semibold my-10 text-2xl relative">
        Bids On My Car
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>
      <div className=" flex flex-wrap mx-5 my-10 gap-24 overflow-auto">
        <table id="bookingTable" className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                ID
              </th>

              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Car Model{" "}
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Bidder's Email
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Placed Bid
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {usercardata?.map((item1) =>
              item1.bidders?.map((item2, index) => (
                <tr key={index}>
                  <td className="pt-2">{index + 1}</td>
                  <td className="pt-2">{item1.modelName}</td>
                  <td className="pt-2">{item2.bidderEmail}</td>
                  <td className="pt-2">
                    <b>{item2.bidAmount}</b>
                  </td>
                  <td className="pt-2 flex justify-center">
                    <button className="rounded shadow-sm bg-yellow-300 text-black">
                      Pending
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2">
        <div className="ml-5 font-semibold my-10 text-2xl relative">
          Report and Issue
          <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 ml-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-black text-xs font-bold mb-2">
              Describe The Issues You Faced
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex md:justify-start ml-2 mb-2 justify-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
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
              {/* Your modal content goes here */}
              <div className=" flex flex-col items-center p-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {usercardata?.map((item1) =>
                  item1.bidders?.map((item2, index) =>
                    // Check if item2.bidderEmail is not empty
                    item2.bidderEmail ? (
                      <p key={index} className="my-2">
                        {item2.bidderEmail} bidded on your car.
                      </p>
                    ) : null
                  )
                )}

                {/* Show "No notifications" if the list is empty */}
                {usercardata &&
                  !usercardata.some((item) =>
                    item.bidders?.some((bidder) => bidder.bidderEmail)
                  ) && <p>No notifications</p>}
                <button
                  className="mt-4 bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-900 "
                  onClick={closeModal}
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDashboard;
