from db import models, schemas
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException


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


def createUser(db: Session, user: schemas.UserCredentials):
    new_user = models.User()
    new_user.toModel(user=user)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def createEvent(db: Session, event: schemas.EventInfo):
    new_event = models.Event()

    new_event.id = event.id
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


def login(db: Session, user: schemas.UserCredentials):

    new_user = db.query(models.User).filter(
        models.User.id == user.id).first()

    if new_user:
        if new_user.password == user.password:
            return True
    else:
        return False


def createSlot(db: Session, slot: schemas.SlotInfo):
    new_slot = models.Slot(
        **slot.dict(), available_tokens=slot.participant_limit)

    # new_slot.start_time = slot.start_time
    # new_slot.end_time = slot.end_time
    # new_slot.event_id = slot.event_id
    # new_slot.participant_limit = slot.participant_limit

    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot


def view_event_slots(db: Session, pk: str):
    return db.query(models.Slot).filter(models.Slot.event_id == pk)


def view_event_details(db: Session, pk: str):
    return db.query(models.Event).filter(models.Event.id == pk).first()


def vew_user_events(user_id: str, db: Session):
    return db.query(models.Event).filter(models.Event.user_id == user_id).all()


def create_participant(participant: schemas.ParcipantInfo, db: Session):
    db_participant = models.Participant(**participant.dict())
    db_slot = db.query(models.Slot).filter(
        models.Slot.id == participant.slot_id).first()

    if db_slot.available_tokens <= 0:
        raise HTTPException(status_code=404, detail="Tokens Not Available")

    db_slot.available_tokens -= 1
    db.add(db_slot)

    max = db.query(func.max(models.Participant.token)).filter(models.Participant.slot_id ==
                                                              participant.slot_id, models.Slot.event_id == participant.event_id).scalar()

    if max:
        db_participant.token = max+1
    else:
        db_participant.token = 1

    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant


def view_participants(event_id: str, db: Session):
    return db.query(models.Participant).filter(models.Participant.event_id == event_id).all()


def view_user_registered_events(user_id: str, db: Session):
    return db.query(models.Participant, models.Slot).filter(models.Participant.user_id == user_id, models.Participant.event_id == models.Slot.event_id).all()
