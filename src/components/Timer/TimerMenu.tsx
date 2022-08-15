import {
  PencilIcon,
  RefreshIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Timer, TimerMode } from "@typeDefs/timer";
import { useAppDispatch } from "@hooks/redux";
import { deleteTimer, updateTimer } from "@store/slices/timerSlice";

type TimerMenuProps = {
  id: string;
  timer: Timer;
};

/**
 * Displays a dynamic menu where the user can edit, reset and delete the timer.
 */
const TimerMenu = ({ id, timer }: TimerMenuProps) => {
  const dispatch = useAppDispatch();

  const onResetClick = () => {
    dispatch(
      updateTimer({
        id,
        timer: { mode: TimerMode.DISPLAY, currentTimer: timer.lastTimer },
      })
    );
  };

  const onEditClick = () => {
    dispatch(updateTimer({ id, timer: { mode: TimerMode.EDIT } }));
  };

  const onDeleteClick = () => {
    dispatch(deleteTimer({ id }));
  };

  const onDisplayClick = () => {
    dispatch(updateTimer({ id, timer: { mode: TimerMode.DISPLAY } }));
  };

  return (
    <div className="w-full h-full">
      <button
        aria-label="Reset"
        className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
        onClick={onResetClick}
      >
        <RefreshIcon className="h-5 w-5 m-auto" />
      </button>
      <button
        aria-label="Edit"
        className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
        onClick={onEditClick}
      >
        <PencilIcon className="h-5 w-5 m-auto" />
      </button>
      <button
        aria-label="Delete"
        className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
        onClick={onDeleteClick}
      >
        <TrashIcon className="h-5 w-5 m-auto" />
      </button>
      <button
        aria-label="Close"
        className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
        onClick={onDisplayClick}
      >
        <XIcon className="h-5 w-5 m-auto" />
      </button>
    </div>
  );
};

export default TimerMenu;
