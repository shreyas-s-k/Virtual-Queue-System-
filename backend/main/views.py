from db import models, engine, crud, SessionLocal, schemas
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from typing import List
import time
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse


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
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


def get_db():
    start = time.time()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        stop = time.time()
        print(f"Time taken : {stop - start}")


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")


@app.post("/create/user")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_id(db=db, user_id=user.id):
        raise HTTPException(
            status_code=400, detail="Username already registered")

    return crud.createUser(user=user, db=db)


@app.post("/create/event")
def createEvent(event: schemas.CreateEvent, db: Session = Depends(get_db)):
    return crud.createEvent(db=db, event=event)
