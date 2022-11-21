const Express = require("express");
const app = Express();
const PORT = 8080;

let serverRoutes = require("./routes");

app.use("/estudiantes" ,Express.static('public'));
app.use(Express.static('html'));


app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

serverRoutes(app);

app.listen(PORT, () => {console.log(`Serven on http://localhost:${PORT}`)})
