import { useEffect, useState } from "react";

const useAttendanceData = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAttendanceData = () => {
    setLoading(true);
    setError("");

    fetch("http://localhost:5000/api/attendance", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setAttendanceData(data);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setError(`The error is: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const refetch = () => {
    fetchAttendanceData();
  };

  return {
    attendanceData,
    loading,
    error,
    refetch,
  };
};

export default useAttendanceData;
