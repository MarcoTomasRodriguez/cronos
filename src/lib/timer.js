/**
 * @description A helper to handle different formats of timers.
 */
class Timer {

    /**
     * @description Initializes the timer with the countdown in seconds.
     * @param {number} time Time in seconds
     */
    constructor(time = 0) {
        this.time = time
    }
    
    /**
     * @description Retrieves the hours
     */
    get hours() {
        return Math.floor(this.time / 3600)
    }
    
    /**
     * @description Retrieves the minutes
     */
    get minutes() {
        return Math.floor((this.time % 3600) / 60)
    }
    
    /**
     * @description Retrieves the seconds
     */
    get seconds() {
        return Math.floor(this.time % 60)
    }

    /**
     * @description Check if string has 3 sections and if those sections have 2 characters each.
     * @example 01:20:00 => true || 102:20:00 => false
     * @param {string} time Formatted time
     */
    static isValidStringTime(time) {
        const splittedTime = time.split(":")
        return splittedTime.length === 3 && splittedTime.every((section) => section.length === 2)
    }

    /**
     * @description Check if number is greater than 0 and lesser than 3.6e5 (99:59:59)
     * @param {number} time Time in seconds
     */
    static isValidIntegerTime(time) {
        return time > 0 && time < 3.6e5
    }
    
    /**
     * @description Creates a string from a number with a defined lenght filled with zeros at the beginning.
     * @param {number} number Number to put into the string
     * @param {number} pad String size
     */
    static zeroPad(number, pad) {
        return String(number).padStart(pad, "0")
    }

    /**
     * @description The opposite of getSexagesimal.
     * @param {number} number 
     * @param {number} position 
     */
    static getDecimal(number, position) {
        switch (position) {
            case 0:
                return Math.floor(number * 3600)
            case 1:
                return Math.floor(number * 60)
            default:
                return number
        }
    }

    /**
     * @description The opposite of getDecimal.
     * @param {number} number 
     * @param {number} position 
     */
    static getSexagesimal(number, position) {
        switch (position) {
            case 0:
                return Math.floor(number / 3600)
            case 1:
                return Math.floor(number / 60)
            default:
                return number
        }
    }

    /**
     * @description Converts timer into a string.
     */
    toString() {
        let timer = this.time
        if (Timer.isValidIntegerTime(timer)) {
            return [...Array(3)].map((_, index) => {
                const sexagesimal = Timer.getSexagesimal(timer, index)
                timer = timer - Timer.getDecimal(sexagesimal, index)
                return Timer.zeroPad(sexagesimal, 2)
            }).join(":")
        } else {
            return "00:00:00"
        }
    }

    /**
     * @description Parses string into time in seconds.
     * @param {string} time Formatted string.
     */
    static parse(time) {
        if (Timer.isValidStringTime(time)) {
            const splittedTime = time.split(":").map(v => parseInt(v))
            return new Timer(splittedTime.reduce((total, current, index) => {
                switch (index) {
                    case 0:
                        return total + current * 3600
                    case 1:
                        return total + current * 60
                    case 2:
                        return total + current
                    default:
                        return total
                }
            }, 0))
        } else {
            return new Timer(0)
        }
    }
}

export default Timer