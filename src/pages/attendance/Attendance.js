import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Calendar from "../../assets/calendar/calendar";
import Clock from "../../assets/clock/Clock";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAttendanceData from "../../hooks/useAttendanceData";
import TableRow from "./TableRow";

const Attendance = () => {
  const { attendanceData, loading, error, refetch } = useAttendanceData();
  // const { user, userLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState({ date: new Date() });

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setInformation(data));
  }, []);

  const handlePunchIn = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/punchin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (!data.error) {
        refetch();
        toast.success("Punch in recorded successful!");
        setIsLoading(false);
      } else {
        toast.error(data.error);
        setIsLoading(false);
      }
      const res1 = await fetch("https://api.db-ip.com/v2/free/self");
      const data1 = await res1.json();
      console.log(data1);
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };
  const handlePunchOut = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/punchout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      if (!data.error) {
        refetch();
        toast.success("Punch out recorded successful!");
        setIsLoading(false);
      } else {
        toast.error(data.error);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const currentDate = new Date(information.date).toLocaleDateString("en-US", {
    timeZone: "Asia/Dhaka",
  });

  const isPunchedInToday = attendanceData.some(
    (attendance) =>
      new Date(attendance.punchin).toLocaleDateString("en-US", {
        timeZone: "Asia/Dhaka",
      }) === currentDate
  );
  const isPunchedOutToday = attendanceData.some(
    (attendance) =>
      new Date(attendance.punchout).toLocaleDateString("en-US", {
        timeZone: "Asia/Dhaka",
      }) === currentDate
  );

  return (
    <div className="min-h-screen mx-auto max-w-[1200px] flex flex-col justify-center items-center lg:mt-5 mt-20 dark:text-white">
      <h3 className="text-center md:mb-5 md:mt-0 text-3xl">
        Atten<span className="text-orange-400">dance</span>
      </h3>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 ">
        <div className="flex flex-col justify-between  w-full overflow-hidden  p-5">
          <div className="mb-5">
            <span>{locationIcon}</span>{" "}
            <span>ip: {information?.clientIp2}</span>
          </div>
          <Calendar date={information.date} />
          <Clock date={information.date} />
        </div>
        <div className="text-center relative overflow-hidden p-3">
          {loading && (
            <div className="w-full absolute top-14 left-0">
              <div className="loader">
                <div className="loaderBar"></div>
              </div>
            </div>
          )}
          <div className="h-[400px] md:overflow-y-scroll md:overflow-x-hidden overflow-scroll attendanceTable md:text-base text-xs">
            <table>
              <thead>
                <tr>
                  <th className="text-left py-5 px-8">Date</th>
                  <th className="text-left py-5 px-8">Punch In</th>
                  <th className="text-left py-5 px-8">Punch Out</th>
                  <th className="text-left py-5 px-8">Working Hour</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData?.map((attendance, index) => (
                  <TableRow
                    key={index}
                    attendance={attendance}
                    date={information.date}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="flex justify-center gap-3">
            {!isPunchedInToday && (
              <button
                disabled={isLoading}
                onClick={handlePunchIn}
                className="bg-sky-400 disabled:bg-sky-300 py-1 px-3 rounded-full text-white hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5 flex disabled:cursor-not-allowed"
              >
                {isLoading && <LoadingSpinner />} <span>Punch In</span>
              </button>
            )}
            {isPunchedInToday && !isPunchedOutToday && (
              <button
                disabled={isLoading}
                onClick={handlePunchOut}
                className="bg-orange-400 disabled:bg-orange-300 py-1 px-3 rounded-full text-white hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5 flex disabled:cursor-not-allowed"
              >
                {isLoading && <LoadingSpinner />} <span>Punch Out</span>
              </button>
            )}

            {/* <button className="bg-orange-400 py-1 px-5 rounded-full text-white hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5">
          Show all
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 inline-block mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);
