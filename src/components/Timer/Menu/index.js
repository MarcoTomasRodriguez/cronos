import PropTypes from "prop-types"

/**
 * @description Displays a dynamic menu where the user can edit, reset and delete the timer.
 */
class MenuTimer extends React.Component {
    render() {
        const { timerUIToggleMenu, timerUIToggleEdit, timerReset, timerDelete } = this.props
        return (
            <div className="w-full h-full">
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { timerUIToggleMenu(); timerReset(); }}>
                    <img className="block m-auto" src="/icons/restart.svg" alt="Reset"/>
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { timerUIToggleMenu(); timerUIToggleEdit(); }}>
                    <img className="block m-auto" src="/icons/edit.svg" alt="Edit" />
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { timerDelete(); }}>
                    <img className="block m-auto" src="/icons/delete.svg" alt="Delete" />
                </button>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold rounded overflow-hidden inline-flex items-center h-full w-1/4"
                    onClick={() => { timerUIToggleMenu(); }}>
                    <img className="block m-auto" src="/icons/close.svg" alt="Close" />
                </button>
            </div>
        )
    }
}

MenuTimer.propTypes = {
    timerUIToggleMenu: PropTypes.func.isRequired,
    timerUIToggleEdit: PropTypes.func.isRequired,
    timerReset: PropTypes.func.isRequired,
    timerDelete: PropTypes.func.isRequired
}

export default MenuTimer