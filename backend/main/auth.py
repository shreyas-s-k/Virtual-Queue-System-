from fastapi import APIRouter, Depends, Response, Request
from main.get_db import get_db
from sqlalchemy.orm import Session
from db import schemas, crud, models

router = APIRouter(prefix="/auth",
                   tags=["auth"],
                   responses={404: {"description": "Not found"}},)


@router.post('/login')
async def login(request: Request, response: Response, user: schemas.UserLogin, db: Session = Depends(get_db)):

    if request.cookies.get("Authenticated", "False") == "True":
        return {"detail": "User Already logged In"}
    else:
        if crud.login(db=db, user=user):
            response.set_cookie(key="Authenticated",
                                value="True", httponly=True)
            return {'detail': 'Authentication Successfull'}
        else:
            response.set_cookie(key="Authenticated",
                                value="False", httponly=True)
            response.status_code = 401
            return {'detail': 'Authentication Failed'}


@router.get('/logout')
async def logout(response: Response, request: Request):
    if request.cookies.get("Authenticated", "False") == "True":
        response.set_cookie(key="Authenticated", value="False", httponly=True)
        return {'detail': 'Successfully Logged Out'}
    else:
        return {'detail': 'User Not Logged In'}
