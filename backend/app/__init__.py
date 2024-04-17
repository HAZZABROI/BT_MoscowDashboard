from dotenv import load_dotenv
import janus

from os import getenv
import asyncio

from app.data import schemas

import pandas as pd

load_dotenv()

SYSTEM_SECRET = getenv('SYSTEM_SECRET')
server_loop = asyncio.new_event_loop()