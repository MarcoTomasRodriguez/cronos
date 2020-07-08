/**
 * Retrieves the hours
 */
export function getHours(time: number): number {
    return Math.floor(time / 3600);
}

/**
 * Retrieves the minutes
 */
export function getMinutes(time: number): number {
    return Math.floor((time % 3600) / 60);
}

/**
 * Retrieves the seconds
 */
export function getSeconds(time: number): number {
    return Math.floor(time % 60);
}

/**
 * Check if the time string has 3 sections and if those sections have 2 characters each.
 */
export function isValidStringTime(time: string): boolean {
    const sections = time.split(":");
    return (
        sections.length === 3 &&
        sections.every((section) => section.length === 2)
    );
}

/**
 * Check if the time is greater than 0 and lesser than 3.6e5 (99:59:59)
 */
export function isValidIntegerTime(time: number): boolean {
    return time > 0 && time < 3.6e5;
}

/**
 * Creates a string from a number with a defined length filled with zeros at the beginning.
 */
export function zeroPad(number: number, pad: number): string {
    return String(number).padStart(pad, "0");
}

/**
 * Gets the decimal time of a section.
 */
export function getDecimal(time: number, section: number): number {
    switch (section) {
        case 0:
            return Math.floor(time * 3600);
        case 1:
            return Math.floor(time * 60);
        default:
            return time;
    }
}

/**
 * Gets the sexagesimal number.
 */
export function getSexagesimal(time: number, section: number) {
    switch (section) {
        case 0:
            return Math.floor(time / 3600);
        case 1:
            return Math.floor(time / 60);
        default:
            return time;
    }
}

/**
 * Converts the usable time format into a string.
 */
export function stringify(time: number): string {
    if (isValidIntegerTime(time)) {
        return [...Array(3)]
            .map((_, index) => {
                const sexagesimal = getSexagesimal(time, index);
                time -= getDecimal(sexagesimal, index);
                return zeroPad(sexagesimal, 2);
            })
            .join(":");
    } else {
        return "00:00:00";
    }
}

/**
 * Parses a time string into a usable time format (seconds).
 */
export function parse(time: string): number {
    if (isValidStringTime(time)) {
        const sectionedTime = time.split(":").map((v) => parseInt(v));
        return sectionedTime.reduce((total, current, index) => {
            switch (index) {
                case 0:
                    return total + current * 3600;
                case 1:
                    return total + current * 60;
                case 2:
                    return total + current;
                default:
                    return total;
            }
        }, 0);
    } else {
        return 0;
    }
}
