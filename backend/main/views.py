from main import user, events, auth
from main.get_db import get_db
from db import models, engine, crud, schemas
from fastapi import Depends, FastAPI, HTTPException, Response, Request
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from main.permissions import IsAuthenticaded
from main.middleware import add_process_time_header
from starlette.middleware.base import BaseHTTPMiddleware


if True:
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000",
                   "http://localhost:3000",
                   "http://127.0.0.1:3000",
                   "http://127.0.0.1:5000"],

    # allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    # expose_headers=["Set-Cookie"],
    allow_credentials=True,
)

app.add_middleware(BaseHTTPMiddleware, dispatch=add_process_time_header)

app.include_router(user.router)
app.include_router(events.router)
app.include_router(auth.router)


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")
