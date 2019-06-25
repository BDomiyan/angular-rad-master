export class Logger {
    public static log(message: string, ...other) {
        console.log.apply(message, ...other);
    }

    public static info(message: string, ...other) {
        console.info.apply(message, ...other);
    }

    public static warn(message: string, ...other) {
        console.warn.apply(message, ...other);
    }

    public static error(message: string, ...other) {
        console.error.apply(message, ...other);
    }
}
