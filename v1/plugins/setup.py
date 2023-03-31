from flask import Flask
from .config import Config


class Setup:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.cfg: Config= Config()


	def initializiation(self):
		self.setup_app()
		self.setup_routers()


	def setup_app(self):
		from flask_session import Session
		
		self.app.config["SESSION_PERMANENT"] = False
		self.app.config["SESSION_TYPE"] = "filesystem"

		Session(self.app)



	def setup_routers(self):
		from routers.admin.publish import PublishAdminRouter
		PublishAdminRouter(self.app).setup()