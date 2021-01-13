from typing import List, Optional
from pydantic import BaseModel
import datetime
from fastapi import Body


class UserList(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class ApiInsert(BaseModel):
    token: str
    data: list

    class Config:
        orm_mode = True


class UserInfo(BaseModel):
    id: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserLogin(BaseModel):
    id: str
    password: str


class UserCreate(UserInfo):
    password: str


class CreateEvent(BaseModel):
    name: str
    description: str
    time_created: Optional[datetime.datetime] = Body(None)
    time_updated: Optional[datetime.datetime] = Body(None)
    user_id: str
    start_time: datetime.datetime
    end_time: datetime.datetime
