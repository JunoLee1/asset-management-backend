"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = require("./lib/logger");
const scheduler_1 = require("./lib/scheduler");
app_1.app.listen(env_1.env.port, '0.0.0.0', () => {
    logger_1.logger.info(`Server listening on port ${env_1.env.port} [${env_1.env.nodeEnv}]`);
    (0, scheduler_1.startScheduler)();
});
//# sourceMappingURL=index.js.map