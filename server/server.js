import app from "./app.js";
import config from "./config/config.js";
import { connectToDB } from "./config/db.js";

const PORT = config.PORT;

const startServer = async () => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();