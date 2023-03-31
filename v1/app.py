from flask import Flask

from plugins.config import Config
from plugins.setup import Setup


cfg: Config= Config()
app: Flask= Flask(cfg.app_name)
Setup(app).initializiation()


if __name__ == '__main__':
	app.run(
		port= cfg.port,
		host= cfg.host,
		debug= cfg.debug
	)