from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
import pymysql
from config import DATABASE

if DATABASE == "sqlite":
    SQLALCHEMY_DATABASE_URL = "sqlite:///sqlite.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
    )

elif DATABASE == "mysql":
    from config import MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME
    SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{ MYSQL_USERNAME}:{MYSQL_PASSWORD}@localhost/test"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"host": MYSQL_HOST, 'port': MYSQL_PORT}, echo=True
    )


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
