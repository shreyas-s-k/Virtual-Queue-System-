import sqlalchemy as sa
from db import Base, schemas
import datetime


class User(Base):
    __tablename__ = "user"
    id = sa.Column(sa.String, primary_key=True,
                   index=True)
    first_name = sa.Column(sa.String)
    last_name = sa.Column(sa.String)
    password = sa.Column(sa.String)

    def toModel(self, user: schemas.UserCreate):
        self.id = user.id
        self.first_name = user.first_name
        self.last_name = user.last_name
        self.password = user.password


class Event(Base):
    __tablename__ = "event"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    name = sa.Column(sa.String)
    description = sa.Column(sa.Text)
    time_created = sa.Column(sa.DateTime(
        timezone=True), server_default=sa.sql.func.now())
    time_updated = sa.Column(sa.DateTime(timezone=True),
                             onupdate=sa.sql.func.now())
    user_id = sa.Column(sa.ForeignKey('user.id'))
    start_time = sa.Column(sa.DateTime, nullable=False)
    end_time = sa.Column(sa.DateTime, nullable=False)


class Slot(Base):
    __tablename__ = "slot"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    start_time = sa.Column(sa.DateTime, nullable=False)
    end_time = sa.Column(sa.DateTime, nullable=False)
    event_id = sa.Column(sa.ForeignKey('event.id'), nullable=False)
    participant_limit = sa.Column(sa.Integer, nullable=False)


class Participant(Base):
    __tablename__ = "participant"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    user_id = sa.Column(sa.ForeignKey('user.id'), nullable=False)
    event_id = sa.Column(sa.ForeignKey('event.id'), nullable=False)
    slot_id = sa.Column(sa.ForeignKey('slot.id'), nullable=False)
