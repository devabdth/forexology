from flask import Flask, session, render_template, url_for, request, redirect
from json import dumps, loads

from os.path import abspath, join, dirname, exists
from sys import path
path.insert(0, '../')
path.insert(1, '../../')

from plugins.config import Config
from plugins.content import Content
from plugins.consts import Consts
from plugins.utils import Utils
from plugins.layout import Layout
from database.helper import DatabaseHelper


class ArticlesCRMRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()

	def setup(self):
		self.assign_articles_crm_analysis()

	def assign_articles_crm_analysis(self):
		@self.app.route(self.consts.crm_articles_route, methods=["GET"])
		def articles_crm_analysis():
			try:
				headers= request.headers
				print(headers)

				with open(abspath(join(dirname(__file__), "../../jsons/articles_report.json")), 'r') as f:
					data= dict(loads(f.read()))
					return self.app.response_class(status= 200, response=dumps(data))
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)