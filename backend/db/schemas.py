from typing import List, Optional
from pydantic import BaseModel
import datetime
from fastapi import Body


class UserInfo(BaseModel):
    id: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    class Config:
        orm_mode = True


class UserCredentials(UserInfo):
    password: str


class EventInfo(BaseModel):
    id: str
    name: str
    description: str
    time_created: Optional[datetime.datetime] = Body(None)
    time_updated: Optional[datetime.datetime] = Body(None)
    user_id: str
    start_time: datetime.datetime
    end_time: datetime.datetime

    class Config:
        orm_mode = True


class SlotInfo(BaseModel):
    start_time: datetime.datetime
    end_time: datetime.datetime
    event_id: str
    participant_limit: int

    class Config:
        orm_mode = True


class Slot(SlotInfo):
    id: int
