import { connect } from "react-redux"

/**
 * @description Creates a new timer with the edit mode enabled.
 */
class AddTimer extends React.Component {
    render() {
        const { timerUICreate } = this.props
        return (
            <button onClick={timerUICreate} className="bg-white hover:bg-gray-200 text-gray-800 font-bold h-20 w-full rounded overflow-hidden shadow-lg inline-flex items-center">
                <img src="/icons/add.svg" alt="Add" className="block m-auto" />
            </button>
        )
    }
}

export default connect(
    () => ({  }), 
    (dispatch) => ({
        timerUICreate: () => dispatch({ type: "TIMER_UI_CREATE" })
    })
)(AddTimer)