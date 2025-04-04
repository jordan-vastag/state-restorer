FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY api.py /code/api

CMD ["fastapi", "run", "api.py", "--port", "8443"]
