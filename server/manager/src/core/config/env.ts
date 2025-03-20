
import dotenvSafe from 'dotenv-safe';
import { get } from 'env-var';

dotenvSafe.config({
	allowEmptyValues: true,
	example: '.env.example'
});

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	MONGO_INITDB_ROOT_USERNAME: get('MONGO_INITDB_ROOT_USERNAME').default('k2ngroup').asString(),
	MONGO_INITDB_ROOT_PASSWORD: get('MONGO_INITDB_ROOT_PASSWORD').required().asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
	MONGO_HOST: get('MONGO_HOST').default('localhost').asString(),
	MONGO_PORT: get('MONGO_PORT').default('27017').asString(),

	mot_de_passe: "ybfm tkhc pyaa bmuy",
	address_mail: "cesaristos85@gmail.com",
	access_key: get('access_key').required().asString(),
	secret_key: get('secret_key').required().asString(),


	token_key: "ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBinGbUCMLS8aa+pnN1WUlPv9ijBKvmAdphVw5GV7fWO",
	refresh_token: "ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPCHVQ9tVNeS/Mh/kF1K/uGLQvNTVuGbZOVT+I0FpHI5",

	MINIO_HOST: get('MINIO_HOST').default('localhost').asString(),
	MINIO_PORT: get('MINIO_PORT').default('9001').asString(),
	REGION_AWS: get('REGION_AWS').default('us-east-1').asString(),
	BUCKET_NAME: get('BUCKET_NAME').required().asString(),
	DATABASE_URL: get('DATABASE_URL').required().asString(),
	MINIO_ROOT_USER: get('MINIO_ROOT_USER').required().asString(),
	MINIO_ROOT_PASSWORD: get('MINIO_ROOT_PASSWORD').required().asString(),
};

export const CONNECTION_STRING = `mongodb://${envs.MONGO_INITDB_ROOT_USERNAME}:${envs.MONGO_INITDB_ROOT_PASSWORD}@${envs.MONGO_HOST}:${envs.MONGO_PORT}/${envs.MONGO_DB_NAME}?authSource=admin`;
