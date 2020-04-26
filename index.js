const http = require("http");
const app = http.createServer();
const fs = require("fs");

app.on("request", (req, res) => {
  const readStream = fs.readFileSync("./index.html").toString();
  res.writeHead(200, "ok", {
    "Content-type": "text/html",
  });
  res.end(readStream);
});
app.listen(13001, () => {
  console.log("http://localhost:13001");
});
