const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    const pattern="/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/"
  if ((req.body.email).match(pattern)) {
    return res.status(422).send({
      error: {
        email: "email không đúng định dạng",
      },
    });
  }
  if (req.body.last_name === "admin") {
    return res.status(500).send({
      error: "server bị lỗi",
    });
  }

  setTimeout(() => {
    next();
  }, 200);
});

// Use default router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
