from fastapi import APIRouter, Depends, HTTPException
from db import crud, schemas
from main.permissions import IsAuthenticaded
from main.get_db import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/user",
                   tags=["user"],
                   dependencies=[Depends(IsAuthenticaded)],
                   responses={404: {"description": "Not found"}},)


@router.post("/create", dependencies=[Depends(IsAuthenticaded)])
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_id(db=db, user_id=user.id):
        raise HTTPException(
            status_code=400, detail="Username already registered")

    return crud.createUser(user=user, db=db)
