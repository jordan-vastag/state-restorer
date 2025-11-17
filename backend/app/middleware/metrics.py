from fastapi import Request
from prometheus_client import make_asgi_app, Counter

from app.core.config import SERVICE_NAME

metrics_app = make_asgi_app()

http_requests_total = Counter("http_requests_total", "Total number of http requests", ["service", "method", "endpoint",])
server_exceptions_total = Counter("server_exceptions_total", "Total number of server errors while servicing http requests", ["service", "method", "endpoint"])

def increment_http_requests_total(request: Request):
    http_requests_total.labels(service=SERVICE_NAME, method=request.method.lower(), endpoint=request.url.path).inc()

def increment_server_exceptions_total(request: Request):
    server_exceptions_total.labels(service=SERVICE_NAME, method=request.method.lower(), endpoint=request.url.path).inc()