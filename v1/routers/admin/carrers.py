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
from database.helper import DatabaseHelper


class CarrersAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_index()
		self.assign_create_job()
		self.assign_update_job()
		self.assign_delete_job()

	def assign_update_job(self):
		@self.app.route(self.consts.admin_carrers_route, methods=["PATCH"])
		def update_job():
			try:
				body= dict(loads(request.data))
				res= self.helper.jobs.update_job(body)
				if res:
					return self.app.response_class(status= 200)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_delete_job(self):
		@self.app.route(self.consts.admin_carrers_route, methods=["DELETE"])
		def delete_job():
			try:
				url_params= dict(request.values)
				res= self.helper.jobs.delete_job(url_params['jobId'])
				if res:
					return self.app.response_class(status= 200)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_create_job(self):
		@self.app.route(self.consts.admin_carrers_route, methods=["POST"])
		def create_job():
			try:
				body= dict(loads(request.data))
				res= self.helper.jobs.create_job(body)
				if res:
					return self.app.response_class(status= 201)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
		
	def assign_index(self):
		@self.app.route(self.consts.admin_carrers_route, methods=["GET"])
		def admin_carrers_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			
			self.helper.categories.load_data()
			self.helper.ads.load_data()
			self.helper.jobs.load_data()
			self.layout.load()

			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/carrers.html',
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