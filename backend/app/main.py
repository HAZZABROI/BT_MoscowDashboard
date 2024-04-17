from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

import janus

from threading import Thread
import asyncio

from app import server_loop
from app.routers import clientside

tags_meta = [
    {
        'name': 'Client side',
        'description': 'Some methods'
    }
]

def side_thread(
        loop: asyncio.AbstractEventLoop, 
):
    asyncio.set_event_loop(loop)

app = FastAPI(
    title='Moscow Dashboard Backend',
    version='0.0.1',
    description='Service for analyzing data and generating response for web',
    openapi_tags=tags_meta,
)
app.include_router(clientside.router)

@app.on_event('startup')
async def startup_event():

    thread = Thread(target=side_thread, args=(server_loop), daemon=True)
    thread.start()

@app.get('/ping')
async def ping() -> str:
    return 'pong'