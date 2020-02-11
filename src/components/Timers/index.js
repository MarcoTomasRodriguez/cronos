import Timer from "../Timer"
import AddTimer from "../AddTimer"

class Timers extends React.Component {
    render() {
        return (
            <div class="p-5 bg-gray-300 min-h-screen">
                <div class="flex flex-wrap -m-2">
                    {
                        [...Array(20)].map((e, i) => (
                            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                                <Timer key={i} />
                            </div>
                        ))
                    }
                    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <AddTimer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Timers