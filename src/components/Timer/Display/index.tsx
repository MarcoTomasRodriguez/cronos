import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { stringify } from "../../../lib/time";
import {
    updateTimer,
    setUIState,
    setTimerState,
    passTimer,
} from "../../../store/actions";
import { Actions, Timer, PassTimerFn } from "../../../store/types";

interface Props
    extends Pick<Actions, "setUIState" | "setTimerState" | "updateTimer"> {
    timer: Timer;
}

/**
 * Displays the content of the timer with the actions.
 */
class DisplayTimer extends React.Component<Props> {
    passTimer: PassTimerFn = passTimer(this.props.timer);

    StartIcon = () => (
        <img className="block m-auto" src="/icons/play.svg" alt="Start" />
    );

    ResetIcon = () => (
        <img className="block m-auto" src="/icons/restart.svg" alt="Reset" />
    );

    DoneIcon = () => (
        <img className="block m-auto" src="/icons/done.svg" alt="Done" />
    );

    PauseIcon = () => (
        <img className="block m-auto" src="/icons/pause.svg" alt="Pause" />
    );

    Title = () => (
        <div>
            <div className="uppercase tracking-wide text-gray-600 font-bold text-xs text-center">
                {this.props.timer.title}
            </div>
        </div>
    );

    Timer = () => (
        <div className="p-2">
            <div
                className={`uppercase tracking-wide text-lg font-bold text-center ${
                    this.props.timer.timerState === "RINGING"
                        ? "text-red-700"
                        : "text-gray-800"
                }`}
            >
                {stringify(this.props.timer.currentTimer)}
            </div>
        </div>
    );

    clickMainButton = () => {
        switch (this.props.timer.timerState) {
            case "RUNNING":
                this.passTimer(this.props.setTimerState, {
                    timerState: "STOPPED",
                });
                break;
            case "RINGING":
                this.passTimer(this.props.updateTimer, {
                    currentTimer: this.props.timer.lastTimer,
                });
                this.passTimer(this.props.setTimerState, {
                    timerState: "STOPPED",
                });
                break;
            case "STOPPED":
                this.passTimer(this.props.setTimerState, {
                    timerState: "RUNNING",
                });
                break;
        }
    };

    clickDisplay = () => {
        if (this.props.timer.timerState === "RINGING") {
            this.passTimer(this.props.updateTimer, {
                currentTimer: this.props.timer.lastTimer,
            });
            this.passTimer(this.props.setTimerState, {
                timerState: "STOPPED",
            });
        } else {
            this.passTimer(this.props.setUIState, {
                uiState: "MENU",
            });
        }
    };

    render() {
        return (
            <div className="p-3 w-full">
                <div className="absolute top-0 right-0 w-8 h-full">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded inline-flex items-center h-full"
                        onClick={this.clickMainButton}
                    >
                        {/*!running && currentTimer.time === 0 && !ringing*/}
                        {false && <this.ResetIcon />}
                        {this.props.timer.timerState === "RUNNING" && (
                            <this.PauseIcon />
                        )}
                        {this.props.timer.timerState === "RINGING" && (
                            <this.DoneIcon />
                        )}
                        {this.props.timer.timerState === "STOPPED" && (
                            <this.StartIcon />
                        )}
                    </button>
                </div>
                <div
                    className="w-card-content h-full cursor-pointer"
                    onClick={this.clickDisplay}
                >
                    <this.Title />
                    <this.Timer />
                </div>
            </div>
        );
    }
}

export default connect(
    () => ({}),
    (dispatch: Dispatch) => ({
        ...bindActionCreators(
            { updateTimer, setUIState, setTimerState },
            dispatch
        ),
    })
)(DisplayTimer);
