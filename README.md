# Virtual Q

Virtual Queue System for Crowd Management </br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-28%20(2).jpg" alt="Virtual-Queue-System-"></a>
</p>
<!-- include screen shots -->

## Backend

### FastApi

Directory - `/backend/`

#### Database & Server Settings

File - `/backend/config.py`<br>

```
# server details
PORT = 5000
RELOAD = True
DEBUG = True
WORKERS = 1
HOST = '0.0.0.0'

# select the database [0] => mysql , [1] => sqlite
DATABASE = ["mysql", "sqlite"][1]

MYSQL_USERNAME = "root"
MYSQL_PASSWORD = "root"
MYSQL_HOST = "localhost"
MYSQL_DB = "test"
MYSQL_PORT = 3306

```

#### Allow origins

Edit `allow_origins` if necessary at `/backend/main/views.py`</br>

```
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000",
                   "http://localhost:3000",
                   "http://127.0.0.1:3000",
                   "http://127.0.0.1:5000",

                   ],
```

## Frontend

### React Js

Directory - `/virtual_queue_sys/`
url - `http://127.0.0.1:3000/`
Don't use localhost:3000 as domain

#### Update Backend Api URL

File - `/virtual_queue_sys/.env.local`

```
REACT_APP_API_URL=http://127.0.0.1:5000

```

### Demo

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-30.jpg" alt="Virtual Q"></a>
</p>
Login</br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-29.jpg" alt="Virtual Q"></a>
</p>

Register </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-28%20(2).jpg" alt="Virtual-Queue-System-"></a>
</p>

Home Page </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-28.jpg" alt="Virtual Q"></a>
</p>

Host an event </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-26.jpg" alt="Virtual Q"></a>
</p>

Create slots </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-25.jpg" alt="Virtual Q"></a>
</p>

Event details </br>
share the event-id with participants</br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-23%20(2).jpg" alt="Virtual Q"></a>
</p>

Attend an Event </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-22.jpg" alt="Virtual Q"></a>
</p>

Select slot </br></br>

<p >
  <a href="#"><img src="https://raw.githubusercontent.com/shreyas-s-k/Virtual-Queue-System-/main/docs/images/photo_2021-07-29_17-48-21.jpg" alt="Virtual Q"></a>
</p>

Enrolled succesfully </br></br>
