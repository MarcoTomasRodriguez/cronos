class EditTimer extends React.Component {

    state = {
        title: this.props.title,
        hours: this.props.hours,
        minutes: this.props.minutes,
        seconds: this.props.seconds
    }

    changeTitle = (e) => this.setState({ title: e.target.value })

    changeHours = (e) => this.setState({ hours: parseInt(e.target.value) })

    changeMinutes = (e) => this.setState({ minutes: parseInt(e.target.value) })
    
    changeSeconds = (e) => this.setState({ seconds: parseInt(e.target.value) })

    submit = (e) => {
        e.preventDefault()
        this.props.timerUpdate(this.state)
    }

    render() {
        const { title, hours, minutes, seconds } = this.state

        return (
            <div>
                <form className="p-3 w-full" autoComplete="off" onSubmit={this.submit}>
                    <div className="absolute top-0 right-0 w-8 h-full">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center h-full"
                            type="submit">
                            <img src="/icons/close.svg" alt="Close" />
                        </button>
                    </div>
                    <div className="w-card-content">
                        <input 
                            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-1" 
                            type="text"
                            placeholder="Title"
                            value={title}
                            maxLength={22}
                            onChange={this.changeTitle}
                        />
                        <div className="flex justify-between">
                            <input 
                                className="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={99}
                                min={0}
                                placeholder="h"
                                value={hours}
                                onChange={this.changeHours}
                            />
                            <input 
                                className="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={59}
                                min={0}
                                placeholder="m"
                                value={minutes}
                                onChange={this.changeMinutes}
                            />
                            <input 
                                className="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={59}
                                min={0}
                                placeholder="s"
                                value={seconds}
                                onChange={this.changeSeconds}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditTimer