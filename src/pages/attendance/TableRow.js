import React, { useState } from "react";

const TableRow = ({ attendance, date: date2 }) => {
  const { Punch_In, Punch_out, date } = attendance;

  const [today, setToday] = useState(new Date(date2));

  // React.useEffect(() => {
  //   if (!Punch_out) {
  //     const timer = setInterval(() => {
  //       setToday((prev) => new Date(prev.getTime() + 1000));
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [today, Punch_out]);

  function calculateWorkingHours(punchIn, punchOut) {
    const punchInDate = new Date(punchIn);
    const punchOutDate = new Date(punchOut);

    const timeDiffMs = punchOutDate - punchInDate;
    const hours = Math.floor(timeDiffMs / 3600000);
    const minutes = Math.floor((timeDiffMs % 3600000) / 60000);
    const seconds = Math.floor((timeDiffMs % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <tr className="">
      <td className="py-2">{date}</td>
      <td className="py-2">{Punch_In}</td>
      <td className="py-2">{Punch_out ? Punch_out : "N/A"}</td>
      <td className="py-2">
        {calculateWorkingHours(Punch_In, Punch_out || today)}
      </td>
    </tr>
  );
};

export default TableRow;
