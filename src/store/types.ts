import {
    createTimer,
    updateTimer,
    deleteTimer,
    clearTimer,
    countdownTimer,
    setUIState,
    setTimerState,
} from "./actions";

export type Action<T> = {
    type: Reducer.Type;
    payload: T;
};

export type TimerState = "STOPPED" | "RUNNING" | "RINGING";
export type UIState = "DISPLAY" | "MENU" | "EDIT";

export type Timer = {
    id: string;
    title: string;
    currentTimer: number;
    lastTimer: number;
    timerState: TimerState;
    uiState: UIState;
};

export type PassTimerFn = (
    fn: (timer: Timer) => void,
    opts?: Partial<Timer>
) => void;

export type Timers = Timer[];

export type State = {
    timers: Timer[];
};

export namespace Payloads {
    export type CreateTimer = null;
    export type UpdateTimer = Pick<
        Timer,
        "id" | "title" | "currentTimer" | "lastTimer"
    >;
    export type DeleteTimer = Pick<Timer, "id">;
    export type ClearTimers = null;
    export type CountdownTimer = null;
    export type SetUIState = Pick<Timer, "id" | "uiState">;
    export type SetTimerState = Pick<Timer, "id" | "timerState">;
    export type NormalizeState = null;
}

export namespace Reducer {
    export type Type =
        | "CREATE_TIMER"
        | "UPDATE_TIMER"
        | "DELETE_TIMER"
        | "CLEAR_TIMER"
        | "COUNTDOWN_TIMER"
        | "SET_TIMER_STATE"
        | "SET_UI_STATE";
    export type Obj = { [key in Type]: Type };
    export type Fn<T> = (state: State, action: Action<T>) => State;
}

export interface Actions {
    createTimer: typeof createTimer;
    updateTimer: typeof updateTimer;
    deleteTimer: typeof deleteTimer;
    clearTimer: typeof clearTimer;
    countdownTimer: typeof countdownTimer;
    setTimerState: typeof setTimerState;
    setUIState: typeof setUIState;
}
