class MenuTimer extends React.Component {
    render() {
        const { toggleMenu, toggleCountdown, restartCountdown, running } = this.props

        return (
            <div className="w-full h-full">
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { toggleCountdown(); toggleMenu(); }}>
                    { !running && <img className="block m-auto" src="/icons/play.svg" /> }
                    { running && <img className="block m-auto" src="/icons/stop.svg" /> }
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { restartCountdown(); toggleMenu(); }}>
                    <img className="block m-auto" src="/icons/restart.svg" />
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4">
                    <img className="block m-auto" src="/icons/edit.svg" />
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { toggleMenu(); }}>
                    <img className="block m-auto" src="/icons/close.svg" />
                </button>
            </div>
        )
    }
}

export default MenuTimer