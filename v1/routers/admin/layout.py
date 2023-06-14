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


class LayoutAdminRouter:
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
		self.assign_article_ads_update()

	def assign_article_ads_update(self):
		@self.app.route(self.consts.admin_layout_articles_ads_route, methods=["PATCH"])
		def articles_ads_update():
			try:
				from models.article import Article
				article= Article(dict(loads(request.data)))
				res= self.helper.articles.update_article(article_id= article.id, payload= article.to_dict())
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_update(self):
		@self.app.route(self.consts.admin_layout_route, methods=["PATCH"])
		def admin_layout_update():
			body= dict(loads(request.data))
			if body['page'] == 'home':
				res= self.layout.update_home_page(body)
			elif body['page'] == 'headerTabs':
				res= self.layout.update_header_tabs(body)

			if res != None and res:
				return self.app.response_class(status= 200)


			return self.app.response_class(status= 500)


	def assign_index(self):
		@self.app.route(self.consts.admin_layout_route, methods=["GET"])
		def admin_layout_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.layout.load()
			self.helper.ads.load_data()
			self.helper.categories.load_data()			
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/layout.html',
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