async function logger(req, res, next) {
  res.on("finish", () => {
    const log = `method: ${req.method} url: ${req.originalUrl} status: ${res.statusCode}`;
    console.log(log);
  });
  next();
}

export default logger;
