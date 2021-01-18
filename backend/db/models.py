import sqlalchemy as sa
from db import Base, schemas
import datetime
from sqlalchemy.orm import relationship, backref


class User(Base):
    __tablename__ = "user"
    id = sa.Column(sa.String(50), primary_key=True,
                   index=True)
    first_name = sa.Column(sa.String(50))
    last_name = sa.Column(sa.String(50))
    password = sa.Column(sa.String(50))

    # Relationship
    events = relationship("Event", backref="user", lazy=True)
    participant = relationship('Participant', backref='user', lazy=True)

    def toModel(self, user: schemas.UserCredentials):
        self.id = user.id
        self.first_name = user.first_name
        self.last_name = user.last_name
        self.password = user.password


class Event(Base):
    __tablename__ = "event"
    id = sa.Column(sa.String(50), primary_key=True,
                   index=True)
    name = sa.Column(sa.String(50))
    description = sa.Column(sa.String(255))
    time_created = sa.Column(sa.DateTime(
        timezone=True), server_default=sa.sql.func.now())
    time_updated = sa.Column(sa.DateTime(timezone=True),
                             onupdate=sa.sql.func.now())
    user_id = sa.Column(sa.String(50), sa.ForeignKey('user.id'))
    start_time = sa.Column(sa.DateTime, nullable=False)
    end_time = sa.Column(sa.DateTime, nullable=False)

    # Relationship
    slot = relationship('Slot', backref='event', lazy=True)
    participant = relationship('Participant', backref='event', lazy=True)


class Slot(Base):
    __tablename__ = "slot"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    start_time = sa.Column(sa.DateTime, nullable=False)
    end_time = sa.Column(sa.DateTime, nullable=False)
    event_id = sa.Column(sa.ForeignKey('event.id'), nullable=False)
    participant_limit = sa.Column(sa.Integer, nullable=False)
    available_tokens = sa.Column(sa.Integer)

    # Relationship
    participant = relationship('Participant', backref='slot', lazy=True)


class Participant(Base):
    __tablename__ = "participant"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    user_id = sa.Column(sa.ForeignKey('user.id'), nullable=False)
    event_id = sa.Column(sa.ForeignKey('event.id'), nullable=False)
    slot_id = sa.Column(sa.ForeignKey('slot.id'), nullable=False)
    token = sa.Column(sa.Integer)
