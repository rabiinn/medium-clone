export const requestLogger = (req, res, next) => {
    console.log("Request logs:")
    console.log("Request method: ", req.method);
    console.log("Request body: ", req.body);
    next()
}