import { connect } from "react-redux"
import Layout from "../components/Layout"
import Timers from "../components/Timers"
import "../assets/styles/main.css"

class Index extends React.Component {

    countdownInverval = null

    ring = new Audio("/effects/ring.mp3")

    playRing = () => {
        this.ring.volume = 1
        this.ring.play()
    }

    componentDidMount() {
        this.ring.preload = true
        this.ring.loop = true
        this.ring.volume = true
    }

    countdown = () => {
        // If some timer is currently running, countdown every active timer.
        if (this.props.timers.some((timer) => timer.running)) {
            this.props.timerCountdown()
        }
        // If some timer is currently ringing, reproduce continuously the ring till the user cancels every bell.
        if (this.props.timers.some((timer) => timer.ringing)) {
            this.playRing()            
        }
    }

    componentDidMount() {
        // For every second execute both ring and countdown statements.
        this.countdownInverval = setInterval(this.countdown, 1000)
    }

    componentWillUnmount() {
        // Clears the ring and countdown interval.
        clearInterval(this.countdownInverval)
    }

    render() {
        const { timers } = this.props
        return (
            <Layout title="Cronos">
                <Timers timers={timers} />
            </Layout>
        )
    }
}

export default connect(
    state => state, 
    dispatch => ({
        timerCountdown: () => dispatch({ type: "TIMER_COUNTDOWN" })
    })
)(Index)