import { PlusIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "@hooks/redux";
import { createTimer } from "@store/slices/timerSlice";

/**
 * Creates a new timer with the edit mode enabled.
 */
const AddTimer = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label="Add Timer"
      className="bg-white hover:bg-gray-200 text-gray-800 font-bold h-20 w-full rounded overflow-hidden shadow-lg inline-flex items-center"
      onClick={() => dispatch(createTimer())}
    >
      <PlusIcon className="h-5 w-5 m-auto" />
    </button>
  );
};

export default AddTimer;
