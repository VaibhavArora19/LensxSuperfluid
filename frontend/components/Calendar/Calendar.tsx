import { ResponsiveCalendar } from "@nivo/calendar";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
const Calendar = (props: any) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const arrangedData = props.data.map((singleData: any) => {
      const currentDate = new Date(singleData.createdAtTimestamp * 1000);

      // Get the year, month, and day
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
      const day = ("0" + currentDate.getDate()).slice(-2);

      const formattedDate = year + "-" + month + "-" + day;
      return {
        value: ethers.utils.formatUnits(singleData.streamedUntilUpdatedAt, 18),
        day: formattedDate,
        // .substring(4),
        // day: "2023-09-04",
      };
    });

    arrangedData.reverse();

    setData(arrangedData);
  }, [props.data]);

  return (
    <div className="overflow-hidden">
      <h1 className="ml-[32rem] font-semibold text-xl">
        You streamed for a total of {data.length} times
      </h1>
      {data.length > 0 && (
        <div className="h-[12.5rem] ml-[11rem] mt-2 w-[95rem]">
          <ResponsiveCalendar
            data={data}
            from={"Jan 1 2023"}
            to={data[data.length - 1].day}
            emptyColor="#E8EAEE"
            colors={["#9CFF2E", "#38E54D", "#54B435"]}
            margin={{ top: 30, right: 0, bottom: 50, left: 0 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={0}
            dayBorderColor="#ffffff"
            daySpacing={4}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
