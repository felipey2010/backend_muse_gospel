import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const saltRound = process.env.JWT_SALTROUND;

const db_user =
  process.env.DB_PRODUCTION === 'true'
    ? process.env.DB_USER_PROD
    : process.env.DB_USER_LOCAL;

const db_port = process.env.DB_PORT;

const db_password =
  process.env.DB_PRODUCTION === 'true'
    ? process.env.DB_PASSWORD_PROD
    : process.env.DB_PASSWORD_LOCAL;

const db_host =
  process.env.DB_PRODUCTION === 'true'
    ? process.env.DB_HOST_PROD
    : process.env.DB_HOST_LOCAL;

const db_name =
  process.env.DB_PRODUCTION === 'true'
    ? process.env.DB_NAME_PROD
    : process.env.DB_NAME_LOCAL;

export const pool = new Pool({
  user: db_user,
  password: db_password,
  host: db_host,
  port: db_port as number | undefined,
  database: db_name,
});

export const createHash = async (text: string) => {
  try {
    const salt = await bcrypt.genSalt(Number(saltRound));

    const encryptedPassword = await bcrypt.hash(text, salt);

    return encryptedPassword;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const comparePasswords = (
  userPassword: string,
  savedPassword: string,
  callback: (err: any, isMatch?: boolean) => {}
) => {
  bcrypt.compare(userPassword, savedPassword, function (err, isMatch) {
    if (err) {
      callback(err);
    } else {
      callback(err, isMatch);
    }
  });
};
