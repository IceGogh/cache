const http = require("http");
const fs = require("fs");
const app = http.createServer();
// 最后更新时间戳
const lastModified = "Sun Apr 26 2020 11:49:44 GMT+0800";
const preModified = new Date(
  new Date(lastModified).getTime() - 60 * 1000 * 60 * 24
).toString();
const tag = '6XsRjDyn58b$4*9&s&4y#U'
console.log("preModified", preModified);
app.on("request", (req, res) => {
  if (req.url === "/img1") {
    console.log("img1");
    const img1 = fs.createReadStream("./static/1.png");
    const reqM = req.headers["if-modified-since"];
    const reqT = req.headers['if-none-match']
    console.log('reqT', reqT)
    console.log('tag', tag)
    console.log(tag === reqT)
    if (reqM && reqM === lastModified && tag === reqT) {
      res.writeHead(304, "keep cache", {
        "last-modified": lastModified,
        "Etag": tag
      });
      res.end();
    } else {
      res.writeHead(200, "ok", {
        "last-modified": lastModified,
        "Etag": tag,
        "Content-type": "image/png",
      });
      img1.pipe(res);
    }
  } else if (req.url === "/img2") {
    // 假设每次都是上一个更新版本
    console.log("img2");
    const img2 = fs.createReadStream("./static/2.png");
    const reqM = preModified;
    if (reqM && reqM === lastModified) {
      res.writeHead(304, "Not Modified", {
          'Cache-Control': 'public',
        "last-modified": preModified,
      });
      res.end();
    } else {
      res.writeHead(200, "ok", {
        'Cache-Control': 'public',
        "last-modified": preModified,
        "Content-type": "image/png",
      });
      img2.pipe(res);
    }
  } else if (req.url === "/jquery") {
    console.log("jquery");
    const jq = fs.createReadStream("./static/jquery.js");
    const reqM = req.headers["if-modified-since"];
    if (reqM && reqM === lastModified) {
      res.writeHead(304, "Not Modified", {
        "last-modified": lastModified,
      });
      res.end();
    } else {
      res.writeHead(200, "ok", {

        "last-modified": lastModified,
        "Content-Type": "application/x-javascript",
      });
      jq.pipe(res);
    }
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
      "Cache-Control": "max-age=2",
      "Content-Type": "image/x-icon",
    });
    ico.pipe(res);
  } else if (req.url === "/json") {
    console.log("json");
    const json = {
      num: Math.random(),
    };
    res.writeHead(200, "ok", {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-javascript",
    });
    res.end(JSON.stringify(json));
  } else {
    res.writeHead(200, "ok", {
      "Content-type": "text/html",
    });
    res.end("404");
  }
});
app.listen(14000, () => {
  console.log("http://127.0.0.1:14000");
});
