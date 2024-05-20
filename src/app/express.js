require("dotenv").config();
const env = require("@Env");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");


// Seve Cors Allow Origin
app.use(cors({ 
	origin: require("@Configs/cors").ORIGIN,
	methods: require("@Configs/cors").METHOD.join(","),
	optionsSuccessStatus: 200 
}));
// Pasre Form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add Client Ip to Request
app.use(require("@Utils/ip").expressHeaderClientIp);
// sử dụng để log mọi request ra console
// app.use(morgan("[:date[iso]][:method :url HTTP/:http-version] Completed with status :status in :response-time ms"));
// sử dụng để log
// app.use(require("express-winston").logger(require("@Utils/logger").expressLoggerInstance));
// app.use(require("express-winston").errorLogger(require("@Utils/logger").expressLoggerError));

// specify the view engine is ejs
app.set("view engine", "ejs");
// specify the view folder is view
app.set("views", path.join(__dirname, "../views"));
// Serve static html, js, css, and image files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));
// Serve compression request response
app.use(compression());

// Initialize original objects, function...  when the application runs
require("@Loaders")(expressWs.getWss(), app);

// Initialize services running in the background
// require("@Services")();

// Initialize the plugins to run when application runs
// require("@Plugins")();

// Initialize the routers websocket
require("@Routers/socket")(app);

// Initialize the routers rest api
app.use("/", require("@Routers/http"));


const server = app.listen(env.SERVER_PORT, () => {
	console.info(
		">>> Express server is running at port %d in %s mode!",
		env.SERVER_PORT,
		env.ENV_ENVIROMENT
	);
	console.log(`>>> Server allowed CORS origins: [${require("@Configs/cors").ORIGIN.join(", ")}]`);
	console.log(`>>> Server allowed CORS methods: [${require("@Configs/cors").METHOD.join(", ")}]`);
	console.log(`>>> Server Jwt Token lifetime: ${env.JWT_EXPIRES_IN}`);
	console.log(">>> Press CTRL-C to stop server...\n");
});

// Export server handle
module.exports = server;