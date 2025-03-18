"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECTION_STRING = exports.envs = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const env_var_1 = require("env-var");
dotenv_safe_1.default.config({
    allowEmptyValues: true,
    example: '.env.example'
});
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    API_PREFIX: (0, env_var_1.get)('DEFAULT_API_PREFIX').default('/api/v1').asString(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').default('development').asString(),
    MONGO_INITDB_ROOT_USERNAME: (0, env_var_1.get)('MONGO_INITDB_ROOT_USERNAME').default('k2ngroup').asString(),
    MONGO_INITDB_ROOT_PASSWORD: (0, env_var_1.get)('MONGO_INITDB_ROOT_PASSWORD').required().asString(),
    MONGO_DB_NAME: (0, env_var_1.get)('MONGO_DB_NAME').required().asString(),
    MONGO_HOST: (0, env_var_1.get)('MONGO_HOST').default('localhost').asString(),
    MONGO_PORT: (0, env_var_1.get)('MONGO_PORT').default('27017').asString(),
    mot_de_passe: "ybfm tkhc pyaa bmuy",
    address_mail: "cesaristos85@gmail.com",
    access_key: (0, env_var_1.get)('access_key').required().asString(),
    secret_key: (0, env_var_1.get)('secret_key').required().asString(),
    MINIO_HOST: (0, env_var_1.get)('MINIO_HOST').default('localhost').asString(),
    MINIO_PORT: (0, env_var_1.get)('MINIO_PORT').default('9001').asString(),
    REGION_AWS: (0, env_var_1.get)('REGION_AWS').default('us-east-1').asString(),
    BUCKET_NAME: (0, env_var_1.get)('BUCKET_NAME').required().asString(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
    MINIO_ROOT_USER: (0, env_var_1.get)('MINIO_ROOT_USER').required().asString(),
    MINIO_ROOT_PASSWORD: (0, env_var_1.get)('MINIO_ROOT_PASSWORD').required().asString(),
};
exports.CONNECTION_STRING = `mongodb://${exports.envs.MONGO_INITDB_ROOT_USERNAME}:${exports.envs.MONGO_INITDB_ROOT_PASSWORD}@${exports.envs.MONGO_HOST}:${exports.envs.MONGO_PORT}/${exports.envs.MONGO_DB_NAME}?authSource=admin`;
//# sourceMappingURL=env.js.map