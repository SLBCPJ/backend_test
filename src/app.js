const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const path = require('path')
require("dotenv").config();
require("./database");
const authRoutes = require("./routes/auth.routes");
const palabraRoutes = require("./routes/palabra.routes");
//configuraciones
//1) configurar puerto:
app.set("port", process.env.PORT || 3000);


//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//rutas
app.use("/api/auth", authRoutes);
app.use("/api/words", palabraRoutes);
// Middleware para Vue.js router modo history
// app.use('/api',require())
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'public')))
//Inicio del servidor
app.listen(app.get("port"), () => {
  console.log("Server Running");
});