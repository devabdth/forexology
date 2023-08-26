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


class ArticlesPublishRouter:
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
		self.assign_delete()
		self.assign_update()
		self.assign_publish_draft()

	def assign_publish_draft(self):
		@self.app.route(self.consts.publisher_publish_draft_page, methods=['POST'])
		def publish_draft():
			try:
				url_params= dict(request.values)
				article= self.helper.articles.get_article_by_id(url_params['articleId'])
				if article is None:
					return self.app.response_class(status= 404)
				
				res= self.helper.articles.update_article(article_id= article.id, payload={'mode': 1}, files= None)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_delete(self):
		@self.app.route(self.consts.publisher_articles_page, methods=["DELETE"])
		def delete_article():
			try:
				url_params= dict(request.values)
				res= self.helper.articles.delete_article(url_params['articleId'])
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
			
	def assign_update(self):
		@self.app.route(self.consts.publisher_articles_page, methods=["PATCH"])
		def update_article():
			try:
				url_params= dict(request.values)
				body= dict(loads(request.form['article']))
				files= dict(request.files)
				res= self.helper.articles.update_article(article_id= url_params['articleId'], payload= body, files= files)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
			
		
	def assign_index(self):
		@self.app.route(self.consts.publisher_articles_page, methods=["GET"])
		def articles_index():
			writer_id= session.get('PUBLISHER_ID')
			if writer_id == None:
				return redirect(self.consts.publisher_login_route)
			
			self.layout.load()
			self.helper.writers.load_data()
			writer= self.helper.writers.get_writer_by_id(writer_id)
			self.helper.articles.refresh_all_articles()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/publish/articles.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				writer= writer,
				articles= [article for article in self.helper.articles.all_articles if writer.id in article.published_by and article.mode == 1],
				drafts= [article for article in self.helper.articles.all_articles if writer.id in article.published_by and article.mode == 0]
			)