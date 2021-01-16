from db import models, schemas
from sqlalchemy.orm import Session


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# def get_all_users(db: Session):
#     result = db.query(models.User).all()
#     print(result)

#     return result


# def create_user(db: Session, name: str, _id: int):
#     user = models.User()
#     user.name = name
#     user.id = _id
#     db.add(user)
#     db.commit()


# def authenticate(db: Session, token_1: str, token_2: str, _id: str):
#     result = db.query(models.Sensor_tokens).\
#         filter(models.Sensor_tokens.sensor_id == _id).first()
#     if result != None:
#         authenticated = result.check_tokens(token_1, token_2)
#     else:
#         authenticated = False

#     return authenticated


def createUser(db: Session, user: schemas.UserCreate):
    new_user = models.User()
    new_user.toModel(user=user)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def createEvent(db: Session, event: schemas.CreateEvent):
    new_event = models.Event()

    new_event.name = event.name
    new_event.description = event.description
    new_event.end_time = event.end_time
    new_event.start_time = event.start_time
    new_event.time_created = event.time_created
    new_event.time_updated = event.time_updated
    new_event.user_id = event.user_id

    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


def login(db: Session, user: schemas.UserLogin):

    new_user = db.query(models.User).filter(
        models.User.id == user.id).first()

    if new_user:
        if new_user.password == user.password:
            return True
    else:
        return False
