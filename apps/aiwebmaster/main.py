import logging

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from auth.bootstrap import bootstrap_admin
from auth.router import router as auth_router
from core.ai_settings import init_ai_settings_table
from db.audit import init_audit_table
from routers import actions, browse, chat, files, settings, system, users

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="AIwebmaster", version="0.2.0", docs_url="/api/docs")


@app.on_event("startup")
def on_startup() -> None:
    try:
        init_audit_table()
    except Exception:
        logger.exception("failed to init aiwebmaster_audit table")
    try:
        bootstrap_admin()
    except Exception:
        logger.exception("failed to bootstrap aiwebmaster_users")
    try:
        init_ai_settings_table()
    except Exception:
        logger.exception("failed to init aiwebmaster_ai_settings table")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/")
def index() -> FileResponse:
    return FileResponse("static/index.html")


@app.get("/login")
def login_page() -> FileResponse:
    return FileResponse("static/login.html")


@app.get("/browse")
def browse_page() -> FileResponse:
    return FileResponse("static/browse.html")


@app.get("/users")
def users_page() -> FileResponse:
    return FileResponse("static/users.html")


@app.get("/system")
def system_page() -> FileResponse:
    return FileResponse("static/system.html")


@app.get("/settings")
def settings_page() -> FileResponse:
    return FileResponse("static/settings.html")


app.include_router(auth_router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(actions.router, prefix="/api")
app.include_router(browse.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(system.router, prefix="/api")
app.include_router(settings.router, prefix="/api")
app.include_router(files.router, prefix="/api")

app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
