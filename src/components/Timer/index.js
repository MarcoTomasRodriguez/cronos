import DisplayTimer from "./Display"
import MenuTimer from "./Menu"

class Timer extends React.Component {

    state = {
        menu: false,
        edit: false,
        running: false,
        title: "Pizza",
        currentTimer: 10,
        lastTimer: 10
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

    render() {
        return (
            <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
                <div className="h-full relative">
                    { !this.state.menu && 
                        <div className="absolute top-0 right-0">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded inline-flex items-center"
                                onClick={this.toggleMenu}>
                                    <img src="/icons/more_vert.svg" />
                            </button>
                        </div>
                    }
                    { !this.state.menu && 
                        <DisplayTimer 
                            title={this.state.title} 
                            timer={this.stringifyTime(this.state.currentTimer)}
                        />
                    }
                    { this.state.menu && 
                        <MenuTimer 
                            toggleMenu={this.toggleMenu} 
                            toggleCountdown={this.toggleCountdown} 
                            restartCountdown={this.restartCountdown}
                            running={this.state.running}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Timer