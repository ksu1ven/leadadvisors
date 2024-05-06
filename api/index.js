import http from "http";

http
  .createServer(async (request, response) => {
    if (request.url == "/api/user") {
      let email = "";

      for await (const chunk of request) {
        email += chunk;
      }
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.end(email);
    }
  })

  .listen(3001, () => console.log(`Сервер запущен по адресу  3001`));
