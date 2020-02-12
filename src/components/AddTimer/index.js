import { connect } from "react-redux"

class AddTimer extends React.Component {
    render() {
        const { timerUICreate } = this.props
        return (
            <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold h-20 w-full rounded overflow-hidden shadow-lg inline-flex items-center"
                onClick={timerUICreate}>
                <img className="block m-auto" src="/icons/add.svg" />
            </button>
        )
    }
}

export default connect(
    state => ({  }), 
    dispatch => ({
        timerUICreate: () => dispatch({ type: "TIMER_UI_CREATE" })
    })
)(AddTimer)