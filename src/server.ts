import express, { Request, Response } from "express";
import dotenv from "dotenv";

//* Express application
const app = express();

//* Configure DotEnv
dotenv.config();

//* Middlewares
app.use(express.json());

//* GET / : API root
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "API root",
		v1_endpoint: "/api/v1",
	});
});

//* GET /api/v1 : API v1
app.get("/api/v1", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "API version 1",
	});
});

app.listen(5000, () => {
	console.log("The server is running on port 5000");
});
