from flask import Flask, render_template, request, session, redirect
from sys import path
from json import dumps, loads

path.insert(0, '../')
path.insert(1, '../../')

from plugins.config import Config
from plugins.content import Content
from plugins.consts import Consts
from plugins.utils import Utils
from plugins.layout import Layout
from database.helper import DatabaseHelper

class AgendaAdminRouter:
	def __init__(self, app:Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()

	def setup(self):
		self.assign_agenda_index()
		self.assign_create_agenda_snippet()
		self.assign_update_agenda_snippet()
		self.assign_delete_agenda_snippet()

	def assign_agenda_index(self):
		@self.app.route(self.consts.admin_agenda_route, methods=['GET'])
		def admin_agenda_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.helper.agenda.load_data()
			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/agenda.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				admin_data= self.helper.admins.get_admin_by_username(aid),
				agenda_snippets= self.helper.agenda.agenda_snippets
			)
	def assign_create_agenda_snippet(self):
		@self.app.route(self.consts.admin_agenda_route, methods=["POST"])
		def create_agenda_snippet():
			try:
				data= loads(request.data)
				res= self.helper.agenda.create_snippet(
					event= data['event'],
					timestamp= data['timestamp'],
					comment= data['comment'],
					country_code= data['countryCode'],
					power= data['power'],
					actual= data["actual"],
					forecast= data["forecast"],
					previous= data["previous"]
				)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_update_agenda_snippet(self):
		@self.app.route(f'{self.consts.admin_agenda_route}/<snippet_id>', methods=["PATCH"])
		def update_agenda_snippet():
			try:
				snippet= loads(request.data)
				res= self.helper.agenda.update_snippet(snippet)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_delete_agenda_snippet(self):
		@self.app.route(f'{self.consts.admin_agenda_route}/<snippet_id>', methods=["DELETE"])
		def delete_agenda_snippet(snippet_id):
			try:
				res= self.helper.agenda.delete_snippet(snippet_id)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

