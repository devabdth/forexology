from threading import Thread, Timer
from flask import Flask
# from flask_socketio import SocketIO

from analyze_lab.crm.articles_analysis import ArticlesAnalysis
from plugins.config import Config
from plugins.setup import Setup


cfg: Config = Config()
app: Flask = Flask(cfg.app_name)
# socket= SocketIO(app, cors_allowed_origins="*")


# Setup(app, socket).initializiation()
setup= Setup(app, None)
setup.initializiation()
threads= setup.threads


if __name__ == '__main__':
    # for thr in threads:
    #     thr.start()
    # for thr in threads:
    #     thr.join()

    app.run(debug=cfg.debug, host= cfg.host, port= cfg.port)
