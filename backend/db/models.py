from sqlalchemy import Column, Integer, String, ForeignKey
from db import Base


class User(Base):
    __tablename__ = "users"
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String(32), unique=True)


class Sensor_tokens(Base):
    __tablename__ = "sensor_tokens"
    sensor_id = Column("sensor_id", String(32), primary_key=True)
    token_1 = Column("token_1", String(32))
    token_2 = Column("token_2", String(32))

    def check_tokens(self, token_1, token_2):
        return (self.token_1 == token_1 and self.token_2 == token_2)

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
