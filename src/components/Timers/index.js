import Timer from "../Timer"
import AddTimer from "../AddTimer"

class Timers extends React.Component {
    render() {
        const { timers } = this.props
        return (
            <div className="p-5 bg-gray-300 min-h-screen">
                <div className="flex flex-wrap -m-2">
                    {
                        timers.map((timer) => (
                            <div key={timer.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                                <Timer timer={timer} />
                            </div>
                        ))
                    }
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <AddTimer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Timers