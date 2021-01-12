import sqlalchemy as sa
from db import Base
import datetime


class User(Base):
    __tablename__ = "user"
    id = sa.Column('id', sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    first_name = sa.Column('name', sa.String(32))
    last_name = sa.Column
    password = sa.Column('password', sa.String(32))


class Event(Base):
    __tablename__ = "event"
    id = sa.Column(sa.Integer, primary_key=True,
                   index=True, autoincrement=True)
    name = sa.Column(sa.String(32))
    description = sa.Column(sa.String)
    time_created = sa.Column(sa.DateTime(
        timezone=True), server_default=sa.sql.func.now())
    time_updated = sa.Column(sa.DateTime(timezone=True),
                             onupdate=sa.sql.func.now())
    host_id = sa.Column(sa.ForeignKey('user.id'))
    start_time = sa.Column('start_time', sa.DateTime)
    end_time = sa.Column('end_time', sa.DateTime)

# class Sensor_tokens(Base):
#     __tablename__ = "sensor_tokens"
#     sensor_id = Column("sensor_id", String(32), primary_key=True)
#     token_1 = Column("token_1", String(32))
#     token_2 = Column("token_2", String(32))
#     name = Column('password', String(32))

#     def check_tokens(self, token_1, token_2):
#         return (self.token_1 == token_1 and self.token_2 == token_2)

# class Sensor(Base):
#     __tablename__ = "api_tokens"
#     sensor_id = Column('id', Integer, primary_key=True)
#     user_id = Column(
#         Integer,
#         ForeignKey('users.id', ondelete='CASCADE'),
#         nullable=False,
#         # no need to add index=True, all FKs have indexes
#     )
#     token_1 = Column('token_1', String)
