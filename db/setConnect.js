import PG from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const Pool = PG.Pool
const pool = new Pool({
  user: 'postgres',
  host: process.env.HostIP,
  database: 'personalDB',
  password: 'password',
  port: 5432,
})

export default pool