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


class ProfilePublishRouter:
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
		self.assign_update()
	
	def assign_update(self):
		@self.app.route(self.consts.publisher_profile_page, methods=["PATCH"])
		def update_writer_data():
			try:
				body= dict(loads(request.form['data']))
				cover= request.files['cover'] if 'cover' in request.files.keys() else None
				bgfree= request.files['bgfree'] if 'bgfree' in request.files.keys() else None
				profile= request.files['profile'] if 'profile' in request.files.keys() else None
				res= self.helper.writers.update_writer(body= body, cover= cover, bgfree= bgfree, profile= profile)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status=500)
			except Exception as e:
				print(e)
				return self.app.response_class(status=500)
		
	def assign_index(self):
		@self.app.route(self.consts.publisher_profile_page, methods=["GET"])
		def publisher_profile_index():
			writer_id= session.get('PUBLISHER_ID')
			if writer_id == None:
				return redirect(self.consts.publisher_login_route)
			
			self.layout.load()
			self.helper.writers.load_data()
			writer= self.helper.writers.get_writer_by_id(writer_id)
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/publish/profile.html',
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