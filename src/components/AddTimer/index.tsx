import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { createTimer } from "../../store/actions";
import { Actions } from "../../store/types";

interface Props extends Pick<Actions, "createTimer"> {}

/**
 * Creates a new timer with the edit mode enabled.
 */
class AddTimer extends React.Component<Props> {
    render() {
        return (
            <button
                onClick={this.props.createTimer}
                className="bg-white hover:bg-gray-200 text-gray-800 font-bold h-20 w-full rounded overflow-hidden shadow-lg inline-flex items-center"
            >
                <img src="/icons/add.svg" alt="Add" className="block m-auto" />
            </button>
        );
    }
}

export default connect(
    () => ({}),
    (dispatch: Dispatch) => ({
        ...bindActionCreators({ createTimer }, dispatch),
    })
)(AddTimer);
