import { config } from 'dotenv';

config();

const { env } = process;
const { TOTAL_TELCOS, TELCOS } = env;

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
