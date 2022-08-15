import { CheckIcon, PauseIcon, PlayIcon } from "@heroicons/react/solid";
import { Timer, TimerStatus, TimerMode } from "@typeDefs/timer";
import { stringify } from "@libs/time";
import { useAppDispatch } from "@hooks/redux";
import { updateTimer } from "@store/slices/timerSlice";

type TimerDisplayProps = {
  id: string;
  timer: Timer;
};

/**
 * Displays the content of the timer with the actions.
 */

const TimerDisplay = ({ id, timer }: TimerDisplayProps) => {
  const dispatch = useAppDispatch();

  const onMainClick = () => {
    switch (timer.status) {
      case TimerStatus.RUNNING:
        dispatch(updateTimer({ id, timer: { status: TimerStatus.STOPPED } }));
        break;
      case TimerStatus.RINGING:
        dispatch(
          updateTimer({
            id,
            timer: {
              status: TimerStatus.STOPPED,
              currentTimer: timer.lastTimer,
            },
          })
        );
        break;
      case TimerStatus.STOPPED:
        dispatch(updateTimer({ id, timer: { status: TimerStatus.RUNNING } }));
        break;
    }
  };

  const onDisplayClick = () => {
    if (timer.status == TimerStatus.RINGING) {
      dispatch(
        updateTimer({
          id,
          timer: {
            status: TimerStatus.STOPPED,
            currentTimer: timer.lastTimer,
          },
        })
      );

      return;
    }

    dispatch(
      updateTimer({
        id,
        timer: {
          mode: TimerMode.MENU,
        },
      })
    );
  };

  return (
    <div className="p-3 w-full">
      <button
        className="absolute top-0 right-0 w-10 h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r inline-flex items-center"
        onClick={onMainClick}
      >
        {timer.status == TimerStatus.RUNNING && (
          <PauseIcon className="h-4 w-4 m-auto" />
        )}
        {timer.status == TimerStatus.RINGING && (
          <CheckIcon className="h-4 w-4 m-auto" />
        )}
        {timer.status == TimerStatus.STOPPED && (
          <PlayIcon className="h-4 w-4 m-auto" />
        )}
      </button>
      <div
        className="w-card-content h-full cursor-pointer space-y-2"
        onClick={onDisplayClick}
      >
        <div className="uppercase tracking-wide text-gray-600 font-bold text-xs text-center">
          {timer.title}
        </div>
        <div
          className={`uppercase tracking-wide text-lg font-bold text-center ${
            timer.status == TimerStatus.RINGING
              ? "text-red-700"
              : "text-gray-800"
          }`}
        >
          {stringify(timer.currentTimer)}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
