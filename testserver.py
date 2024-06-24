from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time


class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        time.sleep(1)
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length).decode("utf-8")
        data = json.loads(post_data)
        print(data)

        if self.path == "/ai/prompt":
            if data["prompt"] == "Success":
                response = {"Success": {"id": 1, "response": "Some Answer Text"}}
            else:
                response = {"Error": "Some Error Message"}
        elif self.path == "/ai/rating":
            if data["id"] == 1 and data["rating"] == 1:
                response = {"Success": "ok"}
            else:
                response = {"Error": "Some Error Message"}
        elif self.path == "/ai/eventstorming":
            if data["prompt"] == "Success":
                response = {"Success": "ok"}
            else:
                response = {"Error": "Some Error Message"}
        elif self.path == "/ai/regenerate":
            if data["prompt"] == "Success":
                response = {
                    "Success": {"id": 1, "response": "Some Regenerated Answer Text"}
                }
            else:
                response = {"Error": "Some Error Message"}
        else:
            response = {"Error": "Another Error Message"}

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response).encode("utf-8"))


def run(server_class=HTTPServer, handler_class=MyServer, port=3000):
    server_address = ("localhost", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on localhost:{port}...")
    httpd.serve_forever()


run()
