import personRoutes from './routes/personRoutes.js'
import app from './app.js'

const PORT = 3000;
app.use("/persons", personRoutes)
app.get("/", (req, res) => res.send("Welcome to the API"))
app.all("*", (req, res) => res.send("This route does not exist"))
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))