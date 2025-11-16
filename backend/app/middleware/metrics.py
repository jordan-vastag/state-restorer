from prometheus_client import make_asgi_app, Counter

metrics_app = make_asgi_app()

request_counter = Counter("http_requests_total", "Total number of http requests", ["method", "endpoint"])
server_exception_counter = Counter("server_exceptions_total", "Total number of server errors while servicing http requests", ["method", "endpoint"])