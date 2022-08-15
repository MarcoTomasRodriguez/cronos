import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { Timer, TimerStatus, TimerMode } from "@typeDefs/timer";

type TimerState = {
  running: string[];
  ringing: string[];
  timers: Record<string, Timer>;
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    running: [],
    ringing: [],
    timers: {},
  } as TimerState,
  reducers: {
    createTimer: (state: TimerState) => {
      const id = uuidV4();

      state.timers[id] = {
        title: "",
        currentTimer: 0,
        lastTimer: 0,
        status: TimerStatus.STOPPED,
        mode: TimerMode.EDIT,
      };
    },
    updateTimer: (
      state: TimerState,
      {
        payload: { id, timer },
      }: PayloadAction<{ id: string; timer: Partial<Timer> }>
    ) => {
      if (timer.status == TimerStatus.RUNNING && !state.running.includes(id)) {
        state.running.push(id);
      }

      if (timer.status == TimerStatus.STOPPED && state.running.includes(id)) {
        state.running.splice(state.running.indexOf(id), 1);
      }

      state.timers[id] = { ...state.timers[id], ...timer };
    },
    deleteTimer: (
      state: TimerState,
      { payload: { id } }: PayloadAction<{ id: string }>
    ) => {
      state.running.splice(state.running.indexOf(id), 1);
      state.ringing.splice(state.running.indexOf(id), 1);
      delete state.timers[id];
    },
    countdownTimers: (state: TimerState) => {
      for (const id in state.running) {
        if (state.timers[id].status != TimerStatus.RUNNING) {
          continue;
        }

        const next = state.timers[id].currentTimer - 1;
        if (next < 0) {
          state.running.splice(state.running.indexOf(id), 1);

          if (!state.ringing.includes(id)) {
            state.ringing.push(id);
          }

          state.timers[id] = {
            ...state.timers[id],
            currentTimer: 0,
            status: TimerStatus.RINGING,
          };

          continue;
        }

        state.timers[id] = { ...state.timers[id], currentTimer: next };
      }
    },
  },
});

export const { createTimer, updateTimer, deleteTimer, countdownTimers } =
  timerSlice.actions;

export default timerSlice.reducer;
