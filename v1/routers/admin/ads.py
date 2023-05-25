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


class AdsAdminRouter:
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
		self.assign_create_ad()
		self.assign_delete_ad()
		self.assign_update_ad()

	def assign_update_ad(self):
		@self.app.route(self.consts.admin_ads_route, methods=["PATCH"])
		def update_ad():
			try:
				body= dict(request.form)
				files= request.files
				res= self.helper.ads.update_ad(loads(body['data']), cover= request.files['bg'] if 'bg' in request.files.keys() else None, bg= body['bg'] if 'bg' in body.keys() else None)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print()
				return self.app.response_class(status= 500)

	def assign_create_ad(self):
		@self.app.route(self.consts.admin_ads_route, methods=["POST"])
		def create_ad():
			try:
				body= dict(request.form)
				files= request.files
				res= self.helper.ads.create_ad(loads(body['data']), cover= request.files['bg'] if 'bg' in request.files.keys() else None, bg= body['bg'] if 'bg' in body.keys() else None)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_delete_ad(self):
		@self.app.route(self.consts.admin_ads_route, methods=["DELETE"])
		def delete_ad():
			try:
				url_params= dict(request.values)
				if 'adid' not in url_params.keys():
					return self.app.response_class(status= 404)
				res= self.helper.ads.delete_ad(ad_id= url_params['adid'])
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)



	def assign_index(self):
		@self.app.route(self.consts.admin_ads_route, methods=["GET"])
		def admin_ads_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.layout.load()
			self.helper.admins.load_admins()
			self.helper.ads.load_data()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/ads.html',
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