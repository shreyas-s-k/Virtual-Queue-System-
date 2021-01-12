from config import HOST, PORT, RELOAD, DEBUG, WORKERS
import uvicorn
import sys
import os
arg = str(sys.argv[1])


if arg == 'runserver':
    if __name__ == "__main__":
        uvicorn.run("main:app", host=HOST, port=PORT,
                    reload=RELOAD, debug=DEBUG, workers=WORKERS)
elif arg == 'migrate':
    os.system('alembic upgrade head')

else:
    print("Wrong Argument")
