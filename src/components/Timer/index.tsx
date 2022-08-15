import { Timer as TimerT, TimerMode } from "@typeDefs/timer";
import TimerDisplay from "./TimerDisplay";
import TimerMenu from "./TimerMenu";
import TimerEdit from "./TimerEdit";

type TimerProps = {
  id: string;
  timer: TimerT;
};

/**
 * Handle the different views and actions inside a Timer.
 */
const Timer = ({ id, timer }: TimerProps) => {
  return (
    <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
      <div className="h-full relative">
        {timer.mode == TimerMode.DISPLAY && (
          <TimerDisplay id={id} timer={timer} />
        )}
        {timer.mode == TimerMode.MENU && <TimerMenu id={id} timer={timer} />}
        {timer.mode == TimerMode.EDIT && <TimerEdit id={id} timer={timer} />}
      </div>
    </div>
  );
};

export default Timer;
