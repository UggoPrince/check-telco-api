import { config } from 'dotenv';

config();

const { env } = process;
const { TOTAL_TELCOS, TELCOS, DB_URL, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } =
  env;

export const getTelcos = JSON.parse(TELCOS);

export const getTotalTelcos = parseInt(TOTAL_TELCOS, 10);

export const getTelcosNumbers = () => {
  const telcoNumbers = [];
  for (let i = 0; i < getTotalTelcos; i++) {
    const telco = JSON.parse(env[`TELCO_${i}`]);
    telcoNumbers.push(telco);
  }
  return telcoNumbers;
};

export const getDbUrl = () => DB_URL;

export const getRedisConfigs = () => ({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
  password: REDIS_PASSWORD,
});
