import React from "react";
import { Timer } from "../../store/types";
import DisplayTimer from "./Display";
import MenuTimer from "./Menu";
import EditTimer from "./Edit";

interface Props {
    timer: Timer;
}

/**
 * Handle the different views and actions inside a Timer.
 */
export default class extends React.Component<Props> {
    render() {
        const { timer } = this.props;
        return (
            <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
                <div className="h-full relative">
                    {timer.uiState === "DISPLAY" && (
                        <DisplayTimer timer={timer} />
                    )}
                    {timer.uiState === "MENU" && <MenuTimer timer={timer} />}
                    {timer.uiState === "EDIT" && <EditTimer timer={timer} />}
                </div>
            </div>
        );
    }
}
