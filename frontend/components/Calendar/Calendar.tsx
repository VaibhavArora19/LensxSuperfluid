import { ResponsiveCalendar } from "@nivo/calendar";
import { data } from "@/lib/constants";

const Calendar = () => {
  return (
    <div className="overflow-hidden">
      <h1 className="ml-[32rem] font-semibold text-xl">
        You streamed for a total of 35 times
      </h1>
      <div className="h-[12.5rem] ml-[11rem] mt-2 w-[95rem]">
        <ResponsiveCalendar
          data={data}
          from={"2015-03-01"}
          to={"2015-07-12"}
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
    </div>
  );
};

export default Calendar;
