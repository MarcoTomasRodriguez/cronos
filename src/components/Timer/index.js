import PropTypes from "prop-types"
import { connect } from "react-redux"
import DisplayTimer from "./Display"
import MenuTimer from "./Menu"
import EditTimer from "./Edit"
import TimerLib from "../../lib/timer"

/**
 * @description Handle the different views and actions inside a Timer.
 */
class Timer extends React.Component {

    timerReset = () => {
        const { timer } = this.props
        this.props.timerReset(timer)
    }

    timerToggle = () => {
        const { timer } = this.props
        this.props.timerToggle(timer)
    }

    timerStopRing = () => {
        const { timer } = this.props
        this.props.timerStopRing(timer)
    }

    timerDelete = () => {
        const { timer } = this.props
        this.props.timerDelete(timer)
    }

    timerUpdate = ({ title = "", hours = 0, minutes = 0, seconds = 0 }) => {
        const { timer } = this.props
        if (title !== "") {
            const countdown = (hours * 3600) + (minutes * 60) + seconds
            this.props.timerUpdate({
                id: timer.id,
                title,
                currentTimer: countdown,
                lastTimer: countdown,
            })
            this.props.timerStop(timer)
            this.props.timerUIToggleEdit(timer)
        } else {
            this.props.timerDelete(timer)
        }
    }

    timerUIToggleMenu = () => {
        const { timer } = this.props
        this.props.timerUIToggleMenu(timer)
    }

    timerUIToggleEdit = () => {
        const { timer } = this.props
        this.props.timerUIToggleEdit(timer)
    }

    render() {
        const { timer } = this.props
        return (
            <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
                <div className="h-full relative">
                    { !timer.menu && !timer.edit && 
                        <DisplayTimer 
                            title={timer.title}
                            currentTimer={new TimerLib(timer.currentTimer)}
                            running={timer.running}
                            ringing={timer.ringing}
                            timerUIToggleMenu={this.timerUIToggleMenu}
                            timerStopRing={this.timerStopRing}
                            timerToggle={this.timerToggle}
                            timerReset={this.timerReset}
                        />
                    }
                    { timer.menu && 
                        <MenuTimer
                            timerUIToggleMenu={this.timerUIToggleMenu} 
                            timerUIToggleEdit={this.timerUIToggleEdit}
                            timerReset={this.timerReset}
                            timerDelete={this.timerDelete}
                        />
                    }
                    { timer.edit &&
                        <EditTimer
                            timerUpdate={this.timerUpdate}
                            title={timer.title}
                            lastTimer={new TimerLib(timer.lastTimer)}
                        />
                    }
                </div>
            </div>
        )
    }
}

Timer.propTypes = {
    timer: PropTypes.object.isRequired
}

export default connect(
    state => ({  }), 
    dispatch => ({
        timerDelete: (payload) => dispatch({ type: "TIMER_DELETE", payload }),
        timerRestart: (payload) => dispatch({ type: "TIMER_RESTART", payload }),
        timerReset: (payload) => dispatch({ type: "TIMER_RESET", payload }),
        timerStart: (payload) => dispatch({ type: "TIMER_START", payload }),
        timerStop: (payload) => dispatch({ type: "TIMER_STOP", payload }),
        timerStopRing: (payload) => dispatch({ type: "TIMER_STOP_RING", payload }),
        timerToggle: (payload) => dispatch({ type: "TIMER_TOGGLE", payload }),
        timerUpdate: (payload) => dispatch({ type: "TIMER_UPDATE", payload }),
        timerUIToggleEdit: (payload) => dispatch({ type: "TIMER_UI_TOGGLE_EDIT", payload }),
        timerUIToggleMenu: (payload) => dispatch({ type: "TIMER_UI_TOGGLE_MENU", payload }),
    })
)(Timer)