from crm.articles_analysis import Arti
from threading import Thread

class CRM:
	def __init__(self):
		self.articles_analysis= ArticlesAnalysis()

	def report(self):
		articles_thr= Thread(target=articles_analysis.report)

