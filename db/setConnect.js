import PG from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const Pool = PG.Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.1',
  database: 'personalDB',
  password: 'password',
  port: 5432,
})

export default pool