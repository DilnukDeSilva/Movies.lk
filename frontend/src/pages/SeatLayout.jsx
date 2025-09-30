import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { seatLayouts } from "../lib/seatLayouts";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const seatLayout = selectedTime?.seatLayout || "layout1";
  const layoutConfig = seatLayouts[seatLayout] || seatLayouts.layout1;

  console.log("Seat layout from DB:", seatLayout);
  console.log("Available seatLayouts keys:", Object.keys(seatLayouts));

  const navigate = useNavigate();

  const { axios, getToken, user } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select the time");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast("This seat is already booked");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
                ${selectedSeats.includes(seatId) && "bg-primary text-white"}
                ${occupiedSeats.includes(seatId) && "opacity-50"}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats");

      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.url;
        // toast.success(data.message)
        // navigate('/my-bookings')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-30">
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        {/* Available timings */}
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => {
            const hallName =
              seatLayouts[item.seatLayout]?.name || "Unknown Hall";
            return (
              <div
                key={item.time}
                onClick={() => {
                  setSelectedTime(item);
                  setSelectedSeats([]); // reset when changing halls
                  setOccupiedSeats([]);
                }}
                className={`flex flex-col items-start gap-1 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <p className="text-sm">{isoTimeFormat(item.time)}</p>
                </div>
                <p className="text-xs opacity-80">{hallName}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        {/*Seat layout (only after selecting a time)*/}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" left="-100px" />
        <BlurCircle top="0px" right="100px" />
        <BlurCircle top="500px" right="500px" />
        <h1 className="text-2xl font-semibold mb-1">Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-1">SCREEN SIDE</p>
        {selectedTime ? (
          <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
            {/* If layout3, layout4, layout5 → stack rows vertically */}
            {["layout3", "layout4", "layout5"].includes(seatLayout) ? (
              <div className="flex flex-col gap-2">
                {layoutConfig.groups.map((row) =>
                  renderSeats(row, layoutConfig.seatsPerRow)
                )}
              </div>
            ) : (
              // Else → keep old left/right grouping
              <>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 mb-6">
                  {layoutConfig.groups[0].map((row) =>
                    renderSeats(row, layoutConfig.seatsPerRow)
                  )}
                </div>

                <div className="grid grid-cols-2 gap-10">
                  {layoutConfig.groups.slice(1).map((group, idx) => (
                    <div key={idx}>
                      {group.map((row) =>
                        renderSeats(row, layoutConfig.seatsPerRow)
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="mt-10 text-gray-400">Please select a show</p>
        )}

        <button
          onClick={bookTickets}
          disabled={!selectedTime}
          className={`flex items-center gap-1 mt-20 px-10 py-3 text-sm rounded-full font-medium cursor-pointer active:scale-95 transition
          ${
            !selectedTime
              ? "bg-gray-400 cursor-not-allowed opacity-70"
              : "bg-primary hover:bg-dull"
          }`}
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
