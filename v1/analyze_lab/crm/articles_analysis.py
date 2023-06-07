import sys
from threading import Thread
sys.path.insert(0, '../')

from database.helper import DatabaseHelper
from plugins.consts import Consts

from models.article import Article
from models.article_section import ArticleSection

import pandas as pd
import numpy as np

class ArticlesAnalysis:
		'''
			- All Readtimes
			- Average Readtime per article
			- All Comments
			- Average Comments per article
			- Most Populer Articles
			- Most Populer Sections
			- Most Viewed articles
			- Most readtime on article
		'''

	def __init__():
		self.helper: DatabaseHelper= DatabaseHelper()
		self.consts: Consts= Consts()

	def report():
		threads= [
			Thread(target= self.all_readtimes),
			Thread(target= self.avg_readtime_per_article),
			Thread(target= self.all_comments),
			Thread(target= self.avg_comment_per_article),
			Thread(target= self.populer_articles),
			Thread(target= self.populer_sections),
			Thread(target= self.most_viewed_articles),
			Thread(target= self.most_readtime_articles),
		]


	def all_readtimes(self):
		pass
	def avg_readtime_per_article(self):
		pass
	def all_comments(self):
		pass
	def avg_comment_per_article(self):
		pass
	def populer_articles(self):
		pass
	def populer_sections(self):
		pass
	def most_viewed_articles(self):
		pass
	def most_readtime_articles(self):
		pass