const http = require("http");
const fs = require("fs");
const app = http.createServer();
app.on("request", (req, res) => {
  if (req.url === "/img1") {
    console.log("img1");
    const img1 = fs.createReadStream("./static/1.png");
    res.writeHead(200, "ok", {
      "Cache-Control": "max-age=20",
      Expires: 5,
      "Content-type": "image/png",
    });
    img1.pipe(res);
  } else if (req.url === "/img2") {
    console.log("img2");
    const img1 = fs.createReadStream("./static/2.png");
    res.writeHead(200, "ok", {
      "Cache-Control": "max-age=60",
      "Content-type": "image/png",
    });
    img1.pipe(res);
  } else if (req.url === "/jquery") {
    console.log("jquery");
    const jq = fs.createReadStream("./static/jquery.js");
    res.writeHead(200, "ok", {
      // "Cache-Control": "public",
      "Cache-Control": 'no-cache',
      "Content-Type": "application/x-javascript",
    });
    jq.pipe(res);
  } else if (req.url === "/reset") {
    console.log("reset");
    const css = fs.readFileSync("./static/reset.css").toString();
    res.writeHead(200, "ok", {
      Expires: 8,
      "Content-Type": "text/css",
    });
    res.end(css);
  } else if (req.url === "/ico") {
    console.log("ico");
    const ico = fs.createReadStream("./static/favicon.ico");
    res.writeHead(200, "ok", {
      // 'Cache-Control': 'privite',
      'Cache-Control': 'max-age=2',
      "Content-Type": "image/x-icon",
    });
    ico.pipe(res)
  } else if (req.url === "/json") {
    console.log("json");
    const json = {
      num: Math.random()
    }
    res.writeHead(200, "ok", {
      "Access-Control-Allow-Origin": "*",
      'Cache-Control': 'no-cache',
      "Content-Type": "application/x-javascript",
    });
    res.end(JSON.stringify(json))
  } else {
    res.writeHead(200, "ok", {
      "Content-type": "text/html",
    });
    res.end("404");
  }
});
app.listen(13000, () => {
  console.log("http://127.0.0.1:13000");
});
