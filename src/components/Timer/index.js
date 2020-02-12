import DisplayTimer from "./Display"
import MenuTimer from "./Menu"
import EditTimer from "./Edit"

class Timer extends React.Component {

    state = {
        menu: false,
        edit: false,
        running: false,
        title: "Pizza",
        currentTimer: 3701,
        lastTimer: 3701
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            if (this.state.running) {
                if (this.state.currentTimer > 0) {
                    this.setState({ currentTimer: this.state.currentTimer - 1 })
                } else {
                    this.setState({ running: false })
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

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

    restartCountdown = () => {
        this.setState({ currentTimer: this.state.lastTimer })
        this.setState({ running: true })
    }

    toggleCountdown = () => this.setState({ running: !this.state.running })

    toggleMenu = () => this.setState({ menu: !this.state.menu })

    toggleEdit = () => this.setState({ edit: !this.state.edit })

    render() {
        return (
            <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
                <div className="h-full relative">
                    { !this.state.menu && !this.state.edit && 
                        <DisplayTimer 
                            title={this.state.title} 
                            timer={this.stringifyTime(this.state.currentTimer)}
                            toggleMenu={this.toggleMenu}
                        />
                    }
                    { this.state.menu && 
                        <MenuTimer 
                            toggleMenu={this.toggleMenu} 
                            toggleEdit={this.toggleEdit}
                            toggleCountdown={this.toggleCountdown}
                            restartCountdown={this.restartCountdown}
                            running={this.state.running}
                        />
                    }
                    { this.state.edit &&
                        <EditTimer
                            toggleEdit={this.toggleEdit}
                            title={this.state.title}
                            hours={this.getHours(this.state.lastTimer)}
                            minutes={this.getMinutes(this.state.lastTimer)}
                            seconds={this.getSeconds(this.state.lastTimer)}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Timer