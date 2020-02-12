class EditTimer extends React.Component {

    state = {
        title: this.props.title,
        hours: this.props.hours,
        minutes: this.props.minutes,
        seconds: this.props.seconds
    }

    changeTitle = (e) => this.setState({ title: e.target.value })

    changeHours = (e) => this.setState({ hours: e.target.value })

    changeMinutes = (e) => this.setState({ minutes: e.target.value })
    
    changeSeconds = (e) => this.setState({ seconds: e.target.value })

    render() {
        const { title, hours, minutes, seconds } = this.state
        const { toggleEdit } = this.props

        return (
            <div>
                <form className="p-3 w-full" autoComplete="off">
                    <div className="absolute top-0 right-0 w-8 h-full">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center h-full"
                            onClick={() => { toggleEdit(); }}>
                            <img src="/icons/close.svg" />
                        </button>
                    </div>
                    <div className="w-card-content">
                        <input 
                            class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mb-1" 
                            type="text"
                            placeholder="Title"
                            value={title}
                        />
                        <div className="flex justify-between">
                            <input 
                                class="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={99}
                                min={0}
                                placeholder="h"
                                value={hours} 
                            />
                            <input 
                                class="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={59}
                                min={0}
                                placeholder="m"
                                value={minutes} 
                            />
                            <input 
                                class="shadow appearance-none border rounded w-3/10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-1" 
                                type="number"
                                max={59}
                                min={0}
                                placeholder="s"
                                value={seconds} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

/*
<div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
*/

export default EditTimer