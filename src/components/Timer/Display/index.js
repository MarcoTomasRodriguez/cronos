class DisplayTimer extends React.Component {
    render() {
        const { title, timer, toggleMenu } = this.props

        return (
            <div className="p-3">
                <div className="absolute top-0 right-0 w-8 h-full">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded inline-flex items-center h-full"
                        onClick={toggleMenu}>
                            <img src="/icons/more_vert.svg" />
                    </button>
                </div>
                <div className="w-card-content">
                    <div className="uppercase tracking-wide text-gray-600 font-bold text-xs text-center">
                        { title }
                    </div>
                </div>
                <div className="w-card-content p-2">
                    <div className="uppercase tracking-wide text-lg text-gray-800 font-bold text-center">
                        { timer }
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayTimer