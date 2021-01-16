from fastapi import APIRouter, Depends, HTTPException
from db import crud, schemas
from main.permissions import IsAuthenticaded
from main.get_db import get_db
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse

router = APIRouter(prefix="/user",
                   tags=["user"],
                   dependencies=[Depends(IsAuthenticaded)],
                   responses={404: {"description": "Not found"}},)


@router.get("/details")
async def get_user_details():
    pass
