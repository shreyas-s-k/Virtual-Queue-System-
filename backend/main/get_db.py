import time
from db import SessionLocal


def get_db():
    start = time.time()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        stop = time.time()
        print(f"Time taken : {stop - start}")
