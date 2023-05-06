from flask import Flask, session, render_template

# Assigning parent pathes
from sys import path
path.insert(0, '../')
path.insert(0, '../../')

# import Plugins
from plugins.config import Config
from plugins.consts import Consts

# import db helper
# from database.helper import Helper

class PublishAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.consts: Consts= Consts()
		self.cfg: Config= Config()


	def setup(self):
		self.assign_publish_form_page()


	def assign_publish_form_page(self):
		@self.app.route(self.consts.admin_publish_form_routes, methods=["GET"])
		def publish_form_page():
			return render_template(
				'admin/publish.html'
			)
