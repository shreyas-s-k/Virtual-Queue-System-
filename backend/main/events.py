from fastapi import APIRouter, Depends, HTTPException
from db import crud, schemas
from main.permissions import IsAuthenticaded
from main.get_db import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/events",
                   tags=["event"],
                   dependencies=[Depends(IsAuthenticaded)],
                   responses={404: {"description": "Not found"}},)


@router.post("/create/event")
def createEvent(event: schemas.EventInfo, db: Session = Depends(get_db)):
    try:
        return crud.createEvent(db=db, event=event)
    except:
        raise HTTPException(
            status_code=400, detail="Error in input data maybe FOREIGN KEY constraint failed.")


@router.post("/create/slot")
def createSlot(slot: schemas.SlotInfo, db: Session = Depends(get_db)):
    try:
        return crud.createSlot(db=db, slot=slot)
    except:
        raise HTTPException(status_code=400, detail="Failed")
