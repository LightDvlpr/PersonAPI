import PG from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const Pool = PG.Pool
const pool = new Pool({
  user: 'TestPostgres',
  host: '192.168.0.1',
  database: 'TestPersonalDB',
  password: 'password',
  port: 2345,
})

export default pool