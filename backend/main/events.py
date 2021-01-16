from fastapi import APIRouter, Depends, HTTPException
from db import crud, schemas
from main.permissions import IsAuthenticaded
from main.get_db import get_db
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(prefix="/event",
                   tags=["event"],
                   dependencies=[Depends(IsAuthenticaded)],
                   responses={404: {"description": "Not found"}},)


@router.post("/")
def create_event(event: schemas.EventInfo, db: Session = Depends(get_db)):
    try:
        return crud.createEvent(db=db, event=event)
    except:
        raise HTTPException(
            status_code=400, detail="Error in input data maybe FOREIGN KEY constraint failed.")


@router.get("/{event_id}")
def view_event(event_id: str, db: Session = Depends(get_db)):
    return crud.view_event(db=db, pk=event_id)


@router.post("/slot")
def create_slot(slot: schemas.SlotInfo, db: Session = Depends(get_db)):
    try:
        return crud.createSlot(db=db, slot=slot)
    except:
        raise HTTPException(status_code=400, detail="Failed")


@router.get("/slot/{event_id}", response_model=List[schemas.SlotInfo])
def view_all_slots(event_id: str, db: Session = Depends(get_db)):
    print(f"this is {event_id}")
    return crud.view_event_slots(db=db, pk=event_id).all()
