import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const SALT = Number(process.env.SALTROUNDS);
const SECRET = process.env.SECRET;

export default { PORT, MONGO_URI, SALT, SECRET };