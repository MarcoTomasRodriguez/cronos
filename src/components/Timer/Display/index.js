class DisplayTimer extends React.Component {

    clickMainButton = () => {
        if (this.props.currentTimer !== 0) {
            this.props.timerToggle()
        } else if (!this.props.ringing) {
            this.props.timerReset()
        } else {
            this.props.timerStopRing()
        }
    }

    render() {
        const { title, timer, running, ringing, currentTimer, timerUIToggleMenu } = this.props

        return (
            <div className="p-3 w-full">
                <div className="absolute top-0 right-0 w-8 h-full">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded inline-flex items-center h-full"
                        onClick={this.clickMainButton}>
                            { !running && currentTimer !== 0 && !ringing &&
                                <img className="block m-auto" src="/icons/play.svg" alt="Start" />
                            }
                            { !running && currentTimer === 0 && !ringing &&
                                <img className="block m-auto" src="/icons/restart.svg" alt="Reset" />
                            }
                            { !running && currentTimer === 0 && ringing &&
                                <img className="block m-auto" src="/icons/done.svg" alt="Done" />
                            }
                            { running && 
                                <img className="block m-auto" src="/icons/pause.svg" alt="Pause" />
                            }
                    </button>
                </div>
                <div className="w-card-content h-full cursor-pointer" onClick={timerUIToggleMenu}>
                    <div>
                        <div className="uppercase tracking-wide text-gray-600 font-bold text-xs text-center">
                            { title }
                        </div>
                    </div>
                    <div className="p-2">
                        { ringing &&
                            <div className="uppercase tracking-wide text-lg text-red-700 font-bold text-center">
                                { timer }
                            </div>
                        }
                        { !ringing &&
                            <div className="uppercase tracking-wide text-lg text-gray-800 font-bold text-center">
                                { timer }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayTimer