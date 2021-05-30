import PG from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const Pool = PG.Pool
const pool = new Pool({
  user: 'TestPostgres',
  host: process.env.HostIP,
  database: 'TestPersonalDB',
  password: 'password',
  port: 2345,
})

export default pool