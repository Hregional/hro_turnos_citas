FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . .

COPY ./authentication_service/management/commands/create_superuser.py /authentication_service/app/management/commands/

RUN pip install --no-cache-dir -r requirements.txt

RUN python manage.py makemigrations

RUN python manage.py migrate

RUN python manage.py create_superuser

EXPOSE 8000

CMD ["gunicorn", "hro_tms_auth_service.wsgi:application", "--bind", "0.0.0.0:8000"]