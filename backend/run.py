from config import HOST, PORT, RELOAD, DEBUG, WORKERS
import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host=HOST, port=PORT,
                reload=RELOAD, debug=DEBUG, workers=WORKERS)
