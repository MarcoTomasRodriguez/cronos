import { FormEvent, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Timer, TimerStatus, TimerMode } from "@typeDefs/timer";
import { useAppDispatch } from "@hooks/redux";
import { deleteTimer, updateTimer } from "@store/slices/timerSlice";
import { getHours, getMinutes, getSeconds } from "@libs/time";

const INPUT_CLASS_NAME =
  "shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1";

type TimerEditProps = {
  id: string;
  timer: Timer;
};

/**
 * Displays a simple form in which the user can edit the props of the timer.
 * If there's no title, the timer is removed.
 */
const TimerEdit = ({ id, timer }: TimerEditProps) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(timer.title);
  const [hours, setHours] = useState(getHours(timer.lastTimer));
  const [minutes, setMinutes] = useState(getMinutes(timer.lastTimer));
  const [seconds, setSeconds] = useState(getSeconds(timer.lastTimer));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title == "") {
      dispatch(deleteTimer({ id }));
      return;
    }

    const newTimer = hours * 3600 + minutes * 60 + seconds;
    dispatch(
      updateTimer({
        id,
        timer: {
          title,
          currentTimer: newTimer,
          lastTimer: newTimer,
          status: TimerStatus.STOPPED,
          mode: TimerMode.DISPLAY,
        },
      })
    );
  };

  return (
    <form className="w-full p-3" autoComplete="off" onSubmit={onSubmit}>
      <button
        aria-label="Save"
        className="absolute top-0 right-0 w-9 h-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center"
        type="submit"
      >
        <CheckIcon className="h-4 w-4" />
      </button>
      <div className="w-card-content">
        <input
          className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-1"
          type="text"
          placeholder="Title"
          value={title}
          maxLength={22}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-between">
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={99}
            min={0}
            placeholder="h"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={59}
            min={0}
            placeholder="m"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
          <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={59}
            min={0}
            placeholder="s"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </div>
      </div>
    </form>
  );
};

export default TimerEdit;
