from flask import Flask
# from flask_socketio import SocketIO

from plugins.config import Config
from plugins.setup import Setup


cfg: Config = Config()
app: Flask = Flask(cfg.app_name)
# socket= SocketIO(app, cors_allowed_origins="*")


# Setup(app, socket).initializiation()
Setup(app, None).initializiation()


if __name__ == '__main__':
    # socket.run(app= app, host= "localhost", port= cfg.port, debug= cfg.debug)
    app.run(
        port= cfg.port,
        host= cfg.host, 
        debug= cfg.debug
    )
