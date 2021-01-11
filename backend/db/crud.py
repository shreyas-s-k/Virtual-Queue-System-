from db import models
from sqlalchemy.orm import Session


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_all_users(db: Session):
    result = db.query(models.User).all()
    print(result)

    return result


def create_user(db: Session, name: str, _id: int):
    user = models.User()
    user.name = name
    user.id = _id
    db.add(user)
    db.commit()


def authenticate(db: Session, token_1: str, token_2: str, _id: str):
    result = db.query(models.Sensor_tokens).\
        filter(models.Sensor_tokens.sensor_id == _id).first()
    if result != None:
        authenticated = result.check_tokens(token_1, token_2)
    else:
        authenticated = False

    return authenticated
