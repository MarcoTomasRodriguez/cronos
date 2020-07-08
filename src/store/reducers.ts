import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { v4 as uuidV4 } from "uuid";
import { Payloads, State, Action, Reducer } from "./types";

export const REDUCERS: Reducer.Obj = {
    CREATE_TIMER: "CREATE_TIMER",
    UPDATE_TIMER: "UPDATE_TIMER",
    DELETE_TIMER: "DELETE_TIMER",
    CLEAR_TIMER: "CLEAR_TIMER",
    COUNTDOWN_TIMER: "COUNTDOWN_TIMER",
    SET_TIMER_STATE: "SET_TIMER_STATE",
    SET_UI_STATE: "SET_UI_STATE",
};

const INITIAL_STATE: State = {
    timers: [],
};

function createTimer(
    state: State,
    _action: Action<Payloads.CreateTimer>
): State {
    return {
        ...state,
        timers: [
            ...state.timers,
            {
                id: uuidV4(),
                title: "",
                currentTimer: 0,
                lastTimer: 0,
                timerState: "STOPPED",
                uiState: "EDIT",
            },
        ],
    };
}

function updateTimer(
    state: State,
    action: Action<Payloads.UpdateTimer>
): State {
    const { id, title, currentTimer, lastTimer } = action.payload;
    return {
        ...state,
        timers: state.timers.map((timer) =>
            timer.id === id
                ? { ...timer, title, currentTimer, lastTimer }
                : timer
        ),
    };
}

function deleteTimer(
    state: State,
    action: Action<Payloads.DeleteTimer>
): State {
    const { id } = action.payload;
    return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== id),
    };
}

function clearTimers(
    state: State,
    _action: Action<Payloads.ClearTimers>
): State {
    return { ...state, timers: [] };
}

function countdownTimer(
    state: State,
    _action: Action<Payloads.CountdownTimer>
): State {
    return {
        ...state,
        timers: state.timers.map((timer) => {
            if (timer.timerState === "RUNNING") {
                const next = timer.currentTimer - 1;
                if (next >= 1) {
                    return {
                        ...timer,
                        currentTimer: next,
                    };
                } else {
                    return {
                        ...timer,
                        currentTimer: 0,
                        timerState: "RINGING",
                    };
                }
            }
            return timer;
        }),
    };
}

function setUIState(state: State, action: Action<Payloads.SetUIState>): State {
    const { id, uiState } = action.payload;
    return {
        ...state,
        timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, uiState } : timer
        ),
    };
}

function setTimerState(
    state: State,
    action: Action<Payloads.SetTimerState>
): State {
    const { id, timerState } = action.payload;
    return {
        ...state,
        timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, timerState } : timer
        ),
    };
}

function reducer(state = INITIAL_STATE, action: Action<any>) {
    const exec = (fn: Reducer.Fn<any>) => fn(state, action);
    switch (action.type) {
        case REDUCERS.CREATE_TIMER:
            return exec(createTimer);
        case REDUCERS.UPDATE_TIMER:
            return exec(updateTimer);
        case REDUCERS.DELETE_TIMER:
            return exec(deleteTimer);
        case REDUCERS.CLEAR_TIMER:
            return exec(clearTimers);
        case REDUCERS.COUNTDOWN_TIMER:
            return exec(countdownTimer);
        case REDUCERS.SET_TIMER_STATE:
            return exec(setTimerState);
        case REDUCERS.SET_UI_STATE:
            return exec(setUIState);
        default:
            return state;
    }
}

export default function (initialState: State) {
    let store;
    const isClient = typeof window !== "undefined";
    if (isClient) {
        const { persistReducer } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;
        const persistConfig = {
            key: "root",
            storage,
        };
        store = createStore(
            persistReducer(persistConfig, reducer),
            initialState
        );
        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(reducer, initialState);
    }
    return store;
}
