from flask import Flask, session, render_template, url_for, request, redirect
from json import dumps, loads

from sys import path
path.insert(0, '../')
path.insert(1, '../../')

from plugins.config import Config
from plugins.content import Content
from plugins.consts import Consts
from plugins.utils import Utils
from plugins.layout import Layout
from plugins.emailling import Emailling
from database.helper import DatabaseHelper


class WritersAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()
		self.emailling: Emailling= Emailling()


	def setup(self):
		self.assign_index()
		self.assign_writer_invitation()
		self.assign_writer_delete_invitation()
	
	def assign_writer_invitation(self):
		@self.app.route(f'{self.consts.admin_writers_route}/invitation/', methods=["POST"])
		def writer_invitation():
			try:
				body= dict(loads(request.data))
				res= self.helper.writers.add_writer_invitation(body['email'])
				
				if res == -1:
					return self.app.response_class(status= 203)
				
				if res != None:
					res= self.emailling.send_writer_invitation(body['email'], res)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
	
	def assign_writer_delete_invitation(self):
		@self.app.route(f'{self.consts.admin_writers_route}/invitation/', methods=["DELETE"])
		def delete_writer_invitation():
			try:
				body= dict(loads(request.data))
				res= self.helper.writers.delete_writer_invitation(body['email'])
				if res == -1:
					return self.app.response_class(status= 404)
				
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
		

	def assign_index(self):
		@self.app.route(self.consts.admin_writers_route, methods=["GET"])
		def admin_writers_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/writers.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				admin_data= self.helper.admins.get_admin_by_username(aid)
			)