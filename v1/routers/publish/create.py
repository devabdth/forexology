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


class CreatePublishRouter:
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
		self.assign_create_article()

	def assign_create_article(self):
		@self.app.route(self.consts.publisher_create_page, methods=["POST"])
		def create_article():
			try:
				writer_id= session.get('PUBLISHER_ID')
				if writer_id == None:
					return redirect(self.consts.publisher_login_route)
				body= loads(request.form['data'])
				files= dict(request.files)
				res= self.helper.articles.create_article(
					payload= body,
					media= files,
					publisher=writer_id
				)
				if res:
					return self.app.response_class(status=201)
				return self.app.response_class(status=500)
			except Exception as e:
				print(e)
				return self.app.response_class(status=500)
			
		
	def assign_index(self):
		@self.app.route(self.consts.publisher_create_page, methods=["GET"])
		def create_index():
			writer_id= session.get('PUBLISHER_ID')
			if writer_id == None:
				return redirect(self.consts.publisher_login_route)
			
			self.layout.load()
			self.helper.writers.load_data()
			writer= self.helper.writers.get_writer_by_id(writer_id)
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/publish/create.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				writer= writer
			)