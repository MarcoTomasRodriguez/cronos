export enum TimerStatus {
  STOPPED,
  RUNNING,
  RINGING,
}

export enum TimerMode {
  DISPLAY,
  MENU,
  EDIT,
}

export type Timer = {
  title: string;
  currentTimer: number;
  lastTimer: number;
  status: TimerStatus;
  mode: TimerMode;
};
