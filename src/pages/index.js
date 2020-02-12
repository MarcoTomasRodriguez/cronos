import { connect } from "react-redux"
import Layout from "../components/Layout"
// import Timers from "../components/Timers"
import "../assets/styles/main.css"
import Timers from "../components/Timers"

class Index extends React.Component {

    countdown = () => {
        if (this.props.timers.some((timer) => timer.running)) {
            this.props.timerCountdown()
        }
    }

    componentDidMount() {
        this.countdownInverval = setInterval(this.countdown, 1000)
    }

    componentWillUnmount() {
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