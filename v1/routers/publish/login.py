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


class LoginPublishRouter:
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
		self.assign_login()
		self.assign_logout()
		self.assign_complete_profile()

	def assign_complete_profile(self):
		@self.app.route(f'{self.consts.publisher_login_route}/completeProfile/', methods=['PATCH'])
		def complete_profile():
			try:
				data= dict(request.form)
				files= request.files

				payload= loads(data['writer'])
				payload['email']= data['username']
				payload['password']= data['password']
				
				res= self.helper.writers.create_writer(
					payload, cover= files['cover'],
					profile= files['profile'], bgFree= files['bgFree'],
				)
				print(res)

				if res:
					return self.app.response_class(status= 200)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_logout(self):
		@self.app.route(self.consts.publisher_logout_route)
		def publisher_logout():
			session.pop('PUBLISHER_ID')
			return self.app.response_class(status= 200)

	def assign_login(self):
		@self.app.route(self.consts.publisher_login_route, methods=["PATCH"])
		def publisher_login():
			try:
				self.helper.writers.load_data()	
				body= dict(loads(request.data))
				if body['mode'] == 'email':
					res= self.helper.writers.get_writer_by_email(body['username'])
					if res != None:
						if type(res) is dict or 'password' not in res.to_dict().keys():
							return self.app.response_class(status= 403)
						return self.app.response_class(status= 200)
					return self.app.response_class(status= 404)

				elif body['mode'] == 'auth':
					res= self.helper.writers.get_writer_by_email(body['username'])
					if res.password == body['password']:
						session['PUBLISHER_ID']= res.id
						return self.app.response_class(status= 200)

					return self.app.response_class(status= 400)

				elif body['mode'] == 'reg':
					res= self.helper.publishers.update_publisher(
						username= body['username'],
						payload= {'password': body['password']},
					)
					if res:
						return self.app.response_class(status= 200)

					return self.app.response_class(status= 500)

			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_index(self):
		@self.app.route(self.consts.publisher_login_route, methods=["GET"])
		def publisher_login_form():
			if not session.get('PUBLISHER_ID') == None:
				return redirect(self.consts.publisher_main_page)
			self.layout.load()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/publish/login.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps
			)