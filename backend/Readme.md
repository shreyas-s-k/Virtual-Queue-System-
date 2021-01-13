python manage.py runserver
alembic revision --autogenerate -m "message"
alembic upgrade head

## You can use

python manage.py runserver
python manage.py makemigrations
python manage.py migrate
