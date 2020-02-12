import DisplayTimer from "./Display"
import MenuTimer from "./Menu"
import EditTimer from "./Edit"
import { connect } from "react-redux"

class Timer extends React.Component {

    getSexagesimal = (number, position) => {
        switch (position) {
            case 0:
                return Math.floor(number / 3600)
            case 1:
                return Math.floor(number / 60)
            default:
                return number
        }
    }

    getDecimal = (number, position) => {
        switch (position) {
            case 0:
                return Math.floor(number * 3600)
            case 1:
                return Math.floor(number * 60)
            default:
                return number
        }
    }

    getHours = (time) => Math.floor(time / 3600)

    getMinutes = (time) => Math.floor((time % 3600) / 60)

    getSeconds = (time) => Math.floor(time % 60)

    zeroPad = (number, pad) => String(number).padStart(pad, '0')

    isValidStringTime = (time) => true

    isValidIntegerTime = (time) => time > 0

    parseTime = (time) => {
        if (this.isValidStringTime(time)) {
            const splittedTime = time.split(":").map(v => parseInt(v))
            return splittedTime.reduce((total, current, index) => {
                switch (index) {
                    case 0:
                        return total + current * 3600
                    case 1:
                        return total + current * 60
                    case 2:
                        return total + current
                    default:
                        return total
                }
            }, 0)
        } else {
            return 0
        }
    }

    stringifyTime = (time) => {
        if (this.isValidIntegerTime(time)) {
            return [...Array(3)].map((_, index) => {
                const sexagesimal = this.getSexagesimal(time, index)
                time = time - this.getDecimal(sexagesimal, index)
                return this.zeroPad(sexagesimal, 2)
            }).join(":")
        } else {
            return "00:00:00"
        }
    }

    timerReset = () => {
        const { timer } = this.props
        this.props.timerReset(timer)
    }

    timerToggle = () => {
        const { timer } = this.props
        this.props.timerToggle(timer)
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
                            timer={this.stringifyTime(timer.currentTimer)}
                            currentTimer={timer.currentTimer}
                            running={timer.running}
                            timerUIToggleMenu={this.timerUIToggleMenu}
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
                            hours={this.getHours(timer.lastTimer)}
                            minutes={this.getMinutes(timer.lastTimer)}
                            seconds={this.getSeconds(timer.lastTimer)}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({  }), 
    dispatch => ({
        timerDelete: (payload) => dispatch({ type: "TIMER_DELETE", payload }),
        timerRestart: (payload) => dispatch({ type: "TIMER_RESTART", payload }),
        timerReset: (payload) => dispatch({ type: "TIMER_RESET", payload }),
        timerStart: (payload) => dispatch({ type: "TIMER_START", payload }),
        timerStop: (payload) => dispatch({ type: "TIMER_STOP", payload }),
        timerToggle: (payload) => dispatch({ type: "TIMER_TOGGLE", payload }),
        timerUpdate: (payload) => dispatch({ type: "TIMER_UPDATE", payload }),
        timerUIToggleEdit: (payload) => dispatch({ type: "TIMER_UI_TOGGLE_EDIT", payload }),
        timerUIToggleMenu: (payload) => dispatch({ type: "TIMER_UI_TOGGLE_MENU", payload }),
    })
)(Timer)