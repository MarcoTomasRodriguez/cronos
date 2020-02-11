class DisplayTimer extends React.Component {
    render() {
        const { title, timer } = this.props

        return (
            <div className="p-3">
                <div className="w-full">
                    <div className="uppercase tracking-wide text-gray-600 font-bold text-xs text-center">
                        { title }
                    </div>
                </div>
                <div className="w-full p-2">
                    <div className="uppercase tracking-wide text-lg text-gray-800 font-bold text-center">
                        { timer }
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayTimer