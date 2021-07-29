# Virtual-Queue-System-

Virtual Queue System for Crowd Management </br>

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
