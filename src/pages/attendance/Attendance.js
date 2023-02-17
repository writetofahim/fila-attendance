import React, { useEffect, useState } from "react";
import Calendar from "../../assets/calendar/calendar";
import Clock from "../../assets/clock/Clock";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/attendance")
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        // setData(d);
      })
      .catch((err) => {
        setError(`The error is: ${err.message}`);
      });
  }, []);
  const handlePunchIn = () => {
    const attendance = { name: "motalib", age: 32, date: new Date() };
    fetch("http://localhost:5000/attendance", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(attendance),
    });
  };
  return (
    <div className="h-screen mx-auto max-w-[1200px] flex flex-col justify-center items-center mt-20 mb-16 dark:text-white">
      <h3 className="text-center mb-5 text-3xl">
        Atten<span className="text-orange-400">dance</span>
      </h3>
      <div className="flex justify-between  w-full h-[450px] overflow-hidden  p-5">
        <div className=" flex items-center">
          <Clock />
        </div>

        <div>
          <Calendar />
        </div>
      </div>
      <div className=" text-center h-96 overflow-hidden">
        <table className=" ">
          <thead>
            <tr>
              <th className="py-5 px-8">Name</th>
              <th className="py-5 px-8">Punch In</th>
              <th className="py-5 px-8">Punch Out</th>
              <th className="py-5 px-8">Working Hour</th>
              <th className="py-5 px-8">Date</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((person, index) => (
              <tr className="" key={index}>
                <td className="py-2">{person.name}</td>
                <td className="py-2">{person.punchIn}</td>
                <td className="py-2">{person.punchOut}</td>
                <td className="py-2">{person.workingHour}</td>
                <td className="py-2">{person.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-red-500">{error}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handlePunchIn}
          className="bg-orange-400 py-1 px-5 rounded-full text-white hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5"
        >
          Punch In
        </button>
        <button className="bg-orange-400 py-1 px-5 rounded-full text-white hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5">
          Punch Out
        </button>

        <button className="bg-orange-400 py-1 px-5 rounded-full text-white hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-violet-300 mt-5">
          Show all
        </button>
      </div>
    </div>
  );
};

export default Attendance;
