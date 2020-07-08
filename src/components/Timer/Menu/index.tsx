import React from "react";
import {
    updateTimer,
    deleteTimer,
    setUIState,
    passTimer,
} from "../../../store/actions";
import { Actions, Timer, PassTimerFn } from "../../../store/types";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

interface Props
    extends Pick<Actions, "updateTimer" | "deleteTimer" | "setUIState"> {
    timer: Timer;
}

/**
 * Displays a dynamic menu where the user can edit, reset and delete the timer.
 */
class MenuTimer extends React.Component<Props> {
    passTimer: PassTimerFn = passTimer(this.props.timer);

    ResetButton = () => (
        <button
            className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
            onClick={() => {
                this.passTimer(this.props.setUIState, { uiState: "DISPLAY" });
                this.passTimer(this.props.updateTimer, {
                    currentTimer: this.props.timer.lastTimer,
                });
            }}
        >
            <img
                className="block m-auto"
                src="/icons/restart.svg"
                alt="Reset"
            />
        </button>
    );

    EditButton = () => (
        <button
            className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
            onClick={() =>
                this.passTimer(this.props.setUIState, { uiState: "EDIT" })
            }
        >
            <img className="block m-auto" src="/icons/edit.svg" alt="Edit" />
        </button>
    );

    DeleteButton = () => (
        <button
            className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
            onClick={() => this.passTimer(this.props.deleteTimer)}
        >
            <img
                className="block m-auto"
                src="/icons/delete.svg"
                alt="Delete"
            />
        </button>
    );

    CloseButton = () => (
        <button
            className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
            onClick={() =>
                this.passTimer(this.props.setUIState, { uiState: "DISPLAY" })
            }
        >
            <img className="block m-auto" src="/icons/close.svg" alt="Close" />
        </button>
    );

    render() {
        return (
            <div className="w-full h-full">
                <this.ResetButton />
                <this.EditButton />
                <this.DeleteButton />
                <this.CloseButton />
            </div>
        );
    }
}

export default connect(
    () => ({}),
    (dispatch: Dispatch) => ({
        ...bindActionCreators(
            { updateTimer, deleteTimer, setUIState },
            dispatch
        ),
    })
)(MenuTimer);
