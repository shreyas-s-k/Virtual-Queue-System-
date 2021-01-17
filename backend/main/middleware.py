import time
from fastapi import Request


async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    # response.headers["X-Content-Type-Options"] = "nosniff"
    # response.headers["X-Frame-Options"] = "DENY"
    # response.headers["Access-Control-Allow-Headers"] = "Set-Cookie"
    # response.headers["Access-Control-Allow-Origin"] = "http://127.0.0.0:3000"
    response.headers["Access-Control-Allow-Headers"] = 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie'
    response.headers["Access-Control-Expose-Headers"] = 'set-cookie'

    print(f'Total Time : {str(process_time)}')
    return response
