from db import models, engine, crud, SessionLocal, schemas
from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi import FastAPI
import time


app = FastAPI()

models.Base.metadata.create_all(bind=engine)


def get_db():
    start = time.time()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        stop = time.time()
        print(f"time taken : {stop - start}")


@app.get("/")
def read_root():
    return {"Hello": "World"}
