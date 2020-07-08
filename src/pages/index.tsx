import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Layout from "../components/Layout";
import Timers from "../components/Timers";
import { countdownTimer } from "../store/actions";
import { Actions, Timer, State } from "../store/types";

const APP_NAME = "Cronos";

interface Props extends Pick<Actions, "countdownTimer"> {
    timers: Timer[];
}

class Index extends React.Component<Props> {
    countdownInterval: NodeJS.Timeout = null;

    ring: HTMLAudioElement = new Audio("/effects/ring.mp3");

    playRing = (): void => {
        this.ring.volume = 1;
        this.ring.play();
    };

    countdown = () => {
        // If some timer is currently running, countdown every active timer.
        if (this.props.timers.some((timer) => timer.timerState === "RUNNING")) {
            this.props.countdownTimer();
        }
        // If some timer is currently ringing, reproduce continuously the ring till the user cancels every bell.
        if (this.props.timers.some((timer) => timer.timerState === "RINGING")) {
            this.playRing();
        }
    };

    componentDidMount() {
        // Initialize the ring audio
        this.ring.preload = "0";
        this.ring.loop = false;
        this.ring.volume = 0;
        // For every second execute both ring and countdown statements.
        this.countdownInterval = setInterval(this.countdown, 1000);
    }

    componentWillUnmount() {
        // Clears the ring and countdown interval.
        clearInterval(this.countdownInterval);
    }

    render() {
        return (
            <Layout title={APP_NAME}>
                <Timers timers={this.props.timers} />
            </Layout>
        );
    }
}

export default connect(
    (state: State) => state,
    (dispatch: Dispatch) => ({
        ...bindActionCreators({ countdownTimer }, dispatch),
    })
)(Index);
