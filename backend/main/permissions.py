from fastapi import Request, HTTPException, Response


async def IsAuthenticaded(request: Request):
    if request.cookies.get("Authenticated", "False") == "False":
        raise HTTPException(status_code=401, detail="Unauthorized")
