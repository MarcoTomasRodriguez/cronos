import { REDUCERS } from "./reducers";
import { Payloads, Timer } from "./types";

export function passTimer(timer: Timer) {
    return function (fn: (timer: Timer) => void, opts: Partial<Timer> = {}) {
        fn({ ...timer, ...opts });
    };
}

export function createTimer(payload: Payloads.CreateTimer = null) {
    return { type: REDUCERS.CREATE_TIMER, payload };
}

export function updateTimer(payload: Payloads.UpdateTimer) {
    return { type: REDUCERS.UPDATE_TIMER, payload };
}

export function deleteTimer(payload: Payloads.DeleteTimer) {
    return { type: REDUCERS.DELETE_TIMER, payload };
}

export function clearTimer(payload: Payloads.ClearTimers = null) {
    return { type: REDUCERS.CLEAR_TIMER, payload };
}

export function countdownTimer(payload: Payloads.CountdownTimer = null) {
    return { type: REDUCERS.COUNTDOWN_TIMER, payload };
}

export function setTimerState(payload: Payloads.SetTimerState) {
    return { type: REDUCERS.SET_TIMER_STATE, payload };
}

export function setUIState(payload: Payloads.SetUIState) {
    return { type: REDUCERS.SET_UI_STATE, payload };
}
