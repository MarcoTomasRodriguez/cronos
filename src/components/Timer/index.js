import DisplayTimer from "./Display"
import MenuTimer from "./Menu"

class Timer extends React.Component {

    state = {
        menu: false,
        edit: false,
        play: false,
        title: "Papas al horno",
        timer: "00:00:00"
    }

    changeMenu = () => this.setState({ menu: !this.state.menu })

    render() {
        return (
            <div className="bg-gray-100 h-20 rounded overflow-hidden shadow-lg">
                <div className="h-full relative">
                    { !this.state.menu && 
                        <div className="absolute top-0 right-0">
                            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded inline-flex items-center"
                                onClick={this.changeMenu}>
                                    <img src="/icons/more_vert.svg" />
                            </button>
                        </div>
                    }
                    { !this.state.menu && <DisplayTimer title={this.state.title} timer={this.state.timer} /> }
                    { this.state.menu && <MenuTimer changeMenu={this.changeMenu} /> }
                </div>
            </div>
        )
    }
}

export default Timer