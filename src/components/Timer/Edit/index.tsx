import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getHours, getMinutes, getSeconds } from "../../../lib/time";
import {
    updateTimer,
    deleteTimer,
    passTimer,
    setTimerState,
    setUIState,
} from "../../../store/actions";
import { Timer, Actions, PassTimerFn } from "../../../store/types";

const INPUT_CLASS_NAME =
    "shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1";

interface Props
    extends Pick<
        Actions,
        "updateTimer" | "deleteTimer" | "setTimerState" | "setUIState"
    > {
    timer: Timer;
}

interface State {
    title: string;
    hours: number;
    minutes: number;
    seconds: number;
}

/**
 * Displays a simple form in which the user can edit the props of the timer.
 * If there's no title, the timer is removed.
 */
class EditTimer extends React.Component<Props, State> {
    readonly state: State = {
        title: this.props.timer.title,
        hours: getHours(this.props.timer.lastTimer),
        minutes: getMinutes(this.props.timer.lastTimer),
        seconds: getSeconds(this.props.timer.lastTimer),
    };

    passTimer: PassTimerFn = passTimer(this.props.timer);

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.state.title !== "") {
            const newTimer =
                this.state.hours * 3600 +
                this.state.minutes * 60 +
                this.state.seconds;
            this.passTimer(this.props.updateTimer, {
                title: this.state.title,
                currentTimer: newTimer,
                lastTimer: newTimer,
            });
            this.passTimer(this.props.setTimerState, {
                timerState: "STOPPED",
            });
            this.passTimer(this.props.setUIState, {
                uiState: "DISPLAY",
            });
        } else {
            this.passTimer(this.props.deleteTimer);
        }
    };

    Title = () => (
        <input
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-1"
            type="text"
            placeholder="Title"
            value={this.state.title}
            maxLength={22}
            onChange={(e) => this.setState({ title: e.target.value })}
        />
    );

    Hours = () => (
        <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={99}
            min={0}
            placeholder="h"
            value={this.state.hours}
            onChange={(e) =>
                this.setState({
                    hours: parseInt(e.target.value),
                })
            }
        />
    );

    Minutes = () => (
        <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={59}
            min={0}
            placeholder="m"
            value={this.state.minutes}
            onChange={(e) =>
                this.setState({
                    minutes: parseInt(e.target.value),
                })
            }
        />
    );

    Seconds = () => (
        <input
            className={INPUT_CLASS_NAME}
            type="number"
            max={59}
            min={0}
            placeholder="s"
            value={this.state.seconds}
            onChange={(e) =>
                this.setState({
                    seconds: parseInt(e.target.value),
                })
            }
        />
    );

    SaveButton = () => (
        <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center h-full"
            type="submit"
        >
            <img src="/icons/done.svg" alt="Save" />
        </button>
    );

    render() {
        return (
            <div>
                <form
                    className="p-3 w-full"
                    autoComplete="off"
                    onSubmit={this.onSubmit}
                >
                    <div className="absolute top-0 right-0 w-8 h-full">
                        <this.SaveButton />
                    </div>
                    <div className="w-card-content">
                        <this.Title />
                        <div className="flex justify-between">
                            <this.Hours />
                            <this.Minutes />
                            <this.Seconds />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    () => ({}),
    (dispatch: Dispatch) => ({
        ...bindActionCreators(
            { updateTimer, deleteTimer, setTimerState, setUIState },
            dispatch
        ),
    })
)(EditTimer);
