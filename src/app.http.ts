import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write(`<h1>URL: ${req.url}</h1>`);
  //   res.end();

  //   const data = { name: "jonh Doe", age: 32, city: "new York" };
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.write(JSON.stringify(data));
  //   res.end();

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.match(".js$")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  } else if (req.url?.match(".css$")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
  res.end(responseContent);
});

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write(`<h1>Hello World</h1>`);
//   res.end();
// });

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.write("Hello world");
//   res.end();
// });

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
