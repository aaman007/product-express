import pino from "pino";

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          timestampKey: 'time',
          translateTime: true,
          ignore: 'pid,hostname'
        },
    }
});

export default logger;