import moment from "moment";
import React, { useState } from "react";

const TableRow = ({ attendance, date }) => {
  const { punchin, punchout } = attendance;

  const [today, setToday] = useState(new Date(date));

  React.useEffect(() => {
    if (!punchout) {
      const timer = setInterval(() => {
        setToday((prev) => new Date(prev.getTime() + 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [today, punchout]);

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
      <td className="py-2">{moment(punchin).format("ll")}</td>
      <td className="py-2">{moment(punchin).format("LT")}</td>
      <td className="py-2">
        {punchout ? moment(punchout).format("LT") : "N/A"}
      </td>
      <td className="py-2">
        {calculateWorkingHours(punchin, punchout || today)}
      </td>
    </tr>
  );
};

export default TableRow;
