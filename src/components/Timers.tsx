import { Timer as TimerT } from "@typeDefs/timer";
import AddTimer from "@components/AddTimer";
import Timer from "@components/Timer";

type TimersProps = {
  timers: Record<string, TimerT>;
};

/**
 * Displays all the timers in a responsive grid.
 */
const Timers = ({ timers }: TimersProps) => {
  return (
    <div className="p-5 min-h-full">
      <div className="flex flex-wrap -m-2">
        {Object.entries(timers).map(([id, timer]) => (
          <div key={id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <Timer id={id} timer={timer} />
          </div>
        ))}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <AddTimer />
        </div>
      </div>
    </div>
  );
};

export default Timers;
