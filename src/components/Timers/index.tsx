import React from "react";
import Timer from "../Timer";
import AddTimer from "../AddTimer";
import { Timers } from "../../store/types";

interface Props {
    timers: Timers;
}

/**
 * Displays all the timers in a responsive grid.
 */
export default class extends React.Component<Props> {
    render() {
        return (
            <div className="p-5 min-h-full">
                <div className="flex flex-wrap -m-2">
                    {this.props.timers.map((timer) => (
                        <div
                            key={timer.id}
                            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                        >
                            <Timer timer={timer} />
                        </div>
                    ))}
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <AddTimer />
                    </div>
                </div>
            </div>
        );
    }
}
