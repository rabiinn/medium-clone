import express from 'express'
import { Router } from 'express'
const app = express()
const router = Router();


router.get('/hello', (req, res) => {
    res.status(200).json({message: "Hello World"});
})

app.use(router);


export default app;



