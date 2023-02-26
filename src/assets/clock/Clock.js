import React, { useState } from "react";

const Clock = (props) => {
  const locale = "en";
  const [today, setDate] = useState(new Date(props.date));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [today]);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") ||
    (hour < 17 && "Afternoon") ||
    (hour < 20 && "Evening") ||
    "Night"
  }, `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="">
      <h1 className="text-xl dark:text-white font-bold">{wish}</h1>
      <h1 className="text-8xl dark:text-white font-bold">
        <span className="text-[#38bdf8]"> {time.split(":")[0]}</span> :{" "}
        <span className="text-[#38bdf8]"> {time.split(":")[1]}</span>
        <span className="text-5xl"> : {time.split(":")[2]}</span>
      </h1>
      <h1 className="text-2xl dark:text-white font-bold">{date}</h1>
    </div>
  );
};

export default Clock;
