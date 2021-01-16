from fastapi import APIRouter, Depends, Response, Request, HTTPException
from main.get_db import get_db
from sqlalchemy.orm import Session
from db import schemas, crud, models

router = APIRouter(prefix="/auth",
                   tags=["auth"],
                   responses={404: {"description": "Not found"}},)


@router.post("/signup")
def signup(user: schemas.UserCredentials, db: Session = Depends(get_db)):
    if crud.get_user_by_id(db=db, user_id=user.id):
        raise HTTPException(
            status_code=400, detail="Username already registered")

    return crud.createUser(user=user, db=db)


@router.post('/login')
async def login(request: Request, response: Response, user: schemas.UserCredentials, db: Session = Depends(get_db)):

    if request.cookies.get("Authenticated", "False") == "True":
        return {"detail": "User Already logged In"}
    else:
        if crud.login(db=db, user=user):
            response.set_cookie(key="Authenticated",
                                value="True", httponly=True)
            response.set_cookie(key="User",
                                value=user.id)

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
        response.set_cookie(key="User")

        return {'detail': 'Successfully Logged Out'}
    else:
        return {'detail': 'User Not Logged In'}
