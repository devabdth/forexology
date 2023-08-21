import datetime
from os.path import abspath, dirname, join, exists
import json
from threading import Thread
import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')

from database.helper import DatabaseHelper
from plugins.consts import Consts
from plugins.middlewares import NpEncoder

from models.article import Article
from models.article_section import ArticleSection

import pandas as pd
import numpy as np

'''
- All Readtimes
- Average Readtime per article
- All Comments
- Average Comments per article
- Most Populer Articles
- Most Populer Sections
- Most Viewed articles
- Most readtime on article

['id', 'title', 'short_brief', 'parent_category', 'cover_attached_msg',
       'category', 'sections', 'ratings', 'comments', 'thread', 'published_in',
       'published_by', 'attached_ad', 'saves', 'mode', 'tags',
       'record_available', 'read_time', 'views']
'''
class ArticlesAnalysis:

	def __init__(self):
		self.helper: DatabaseHelper= DatabaseHelper()
		self.consts: Consts= Consts()

		articles= self.helper.articles.get_all_articles()
		categories= self.helper.categories.active_cats
		classification= self.helper.categories.parent_cats
		names= articles[0].to_dict().keys()
		self.articles_df= pd.DataFrame([article.to_dict() for article in articles], columns= names)

		self.path_= abspath(join(dirname(__file__), '../../jsons/articles_report.json'))

		self.load_data()

	def write_data(self):
		self.data[f"{datetime.date.today().year}"]["overall"]= self.interactions_report

		self.year_data= {}
		for _, row in self.weeks_pervious_records.iterrows():
			week= row["week"]
			del row["week"]

			self.data[f"{datetime.date.today().year}"]["weeks"][f"{int(week)}"]= dict(row)

		for _, row in self.months_pervious_records.iterrows():
			month= row["month"]
			del row["month"]

			self.data[f"{datetime.date.today().year}"]["months"][f"{int(month)}"]= dict(row)

		with open(self.path_, 'w') as f:
			f.write(json.dumps(self.data, cls= NpEncoder))

		self.load_data()

	def load_data(self):
		with open(self.path_, 'r') as f:
			self.data= {}
			self.data= dict(json.loads(f.read()))
			self.weeks_pervious_records= pd.DataFrame(self.data[f"{datetime.date.today().year}"]["weeks"].values())
			self.weeks_pervious_records["week"]= self.data[f"{datetime.date.today().year}"]["weeks"].keys()
			self.weeks_pervious_records['week'] = self.weeks_pervious_records['week'].apply(lambda x: int(float(x)))
			self.weeks_pervious_records= self.weeks_pervious_records.sort_values(by='week', ascending= True, ignore_index= True)

			self.months_pervious_records= pd.DataFrame(self.data[f"{datetime.date.today().year}"]["months"].values())
			self.months_pervious_records["month"]= self.data[f"{datetime.date.today().year}"]["months"].keys()
			self.months_pervious_records['month'] = self.months_pervious_records['month'].apply(lambda x: int(float(x)))
			self.months_pervious_records= self.months_pervious_records.sort_values(by='month', ascending= True, ignore_index= True)

	def calculate_current_week_analysis(self):
		week_number= datetime.date.today().isocalendar()[1]

		dataframe= self.weeks_pervious_records.loc[self.weeks_pervious_records["week"] != f'{week_number}']
		dataframe.loc[f"{int(week_number)}"]= {
			"TOTAL_READTIME": self.interactions_report["TOTAL_READTIME"] - dataframe["TOTAL_READTIME"].sum(),
			"AVG_READTIME": self.interactions_report["AVG_READTIME"] - dataframe["AVG_READTIME"].sum(),
			"TOTAL_VIEWS": self.interactions_report["TOTAL_VIEWS"] - dataframe["TOTAL_VIEWS"].sum(),
			"AVG_VIEWS": self.interactions_report["AVG_VIEWS"] - dataframe["AVG_VIEWS"].sum(),
			"TOTAL_SAVES": self.interactions_report["TOTAL_SAVES"] - dataframe["TOTAL_SAVES"].sum(),
			"AVG_SAVES": self.interactions_report["AVG_SAVES"] - dataframe["AVG_SAVES"].sum(),
			"TOTAL_COMMENTS": self.interactions_report["TOTAL_COMMENTS"] - dataframe["TOTAL_COMMENTS"].sum(),
			"AVG_COMMENTS": self.interactions_report["AVG_COMMENTS"] - dataframe["AVG_COMMENTS"].sum(),
			"TOTAL_RATINGS_APPROACHES": self.interactions_report["TOTAL_RATINGS_APPROACHES"] - dataframe["TOTAL_RATINGS_APPROACHES"].sum(),
			"AVG_RATE": self.interactions_report["AVG_RATE"] - dataframe["AVG_RATE"].sum(),
			"week": int(week_number),
			"CATEGORIES": {k: dataframe["CATEGORIES"][k] - self.interactions_report["CATEGORIES"][k] if (k in dataframe["CATEGORIES"] and dataframe["CATEGORIES"][k] != np.nan) else self.interactions_report["CATEGORIES"][k] for k in self.interactions_report["CATEGORIES"]},
			"CLASSIFICATIONS": {k: dataframe["CLASSIFICATIONS"][k] - self.interactions_report["CLASSIFICATIONS"][k] if (k in dataframe["CLASSIFICATIONS"] and dataframe["CLASSIFICATIONS"][k] != np.nan) else self.interactions_report["CLASSIFICATIONS"][k] for k in self.interactions_report["CLASSIFICATIONS"]},
		}

		self.weeks_pervious_records= dataframe

	def calculate_current_month_analysis(self):
		month_number= datetime.date.today().month

		dataframe= self.months_pervious_records.loc[self.months_pervious_records["month"] != f'{month_number}']
		dataframe.loc[f"{int(month_number)}"]= {
			"TOTAL_READTIME": self.interactions_report["TOTAL_READTIME"] - dataframe["TOTAL_READTIME"].sum(),
			"AVG_READTIME": self.interactions_report["AVG_READTIME"] - dataframe["AVG_READTIME"].sum(),
			"TOTAL_VIEWS": self.interactions_report["TOTAL_VIEWS"] - dataframe["TOTAL_VIEWS"].sum(),
			"AVG_VIEWS": self.interactions_report["AVG_VIEWS"] - dataframe["AVG_VIEWS"].sum(),
			"TOTAL_SAVES": self.interactions_report["TOTAL_SAVES"] - dataframe["TOTAL_SAVES"].sum(),
			"AVG_SAVES": self.interactions_report["AVG_SAVES"] - dataframe["AVG_SAVES"].sum(),
			"TOTAL_COMMENTS": self.interactions_report["TOTAL_COMMENTS"] - dataframe["TOTAL_COMMENTS"].sum(),
			"AVG_COMMENTS": self.interactions_report["AVG_COMMENTS"] - dataframe["AVG_COMMENTS"].sum(),
			"TOTAL_RATINGS_APPROACHES": self.interactions_report["TOTAL_RATINGS_APPROACHES"] - dataframe["TOTAL_RATINGS_APPROACHES"].sum(),
			"AVG_RATE": self.interactions_report["AVG_RATE"] - dataframe["AVG_RATE"].sum(),
			"month": int(month_number),
			"CATEGORIES": {k: dataframe["CATEGORIES"][k] - self.interactions_report["CATEGORIES"][k] if (k in dataframe["CATEGORIES"] and dataframe["CATEGORIES"][k] != np.nan) else self.interactions_report["CATEGORIES"][k] for k in self.interactions_report["CATEGORIES"]},
			"CLASSIFICATIONS": {k: dataframe["CLASSIFICATIONS"][k] - self.interactions_report["CLASSIFICATIONS"][k] if (k in dataframe["CLASSIFICATIONS"] and dataframe["CLASSIFICATIONS"][k] != np.nan) else self.interactions_report["CLASSIFICATIONS"][k] for k in self.interactions_report["CLASSIFICATIONS"]},

			}

		self.months_pervious_records= dataframe

	def report(self):
		threads= [
			Thread(target= self.interactions),
			Thread(target= self.trending),
		]

		for thr in threads:
			thr.start()

		for thr in threads:
			thr.join()

		threads= [
			Thread(target= self.calculate_current_week_analysis),
			Thread(target= self.calculate_current_month_analysis),
		]

		for thr in threads:
			thr.start()

		for thr in threads:
			thr.join()

		self.write_data()

	def dicimal_resolve(self, input) -> float:
		return float('{:20.2f}'.format(input))

	def interactions(self):
		report= {}
		dataframe= self.articles_df
		dataframe['read_time_values'] = dataframe['read_time'].apply(lambda x: sum(x.values()))
		report['TOTAL_READTIME']= dataframe["read_time_values"].sum()
		report['AVG_READTIME']= self.dicimal_resolve(report['TOTAL_READTIME'] / len(dataframe))

		report['TOTAL_VIEWS']= dataframe["views"].sum()
		report['AVG_VIEWS']= self.dicimal_resolve(report['TOTAL_VIEWS'] / len(dataframe))

		report['TOTAL_SAVES']= dataframe["saves"].sum()
		report['AVG_SAVES']= self.dicimal_resolve(report['TOTAL_SAVES'] / len(dataframe))

		dataframe['comments_lengths'] = dataframe['comments'].apply(lambda x: len(x))
		report['TOTAL_COMMENTS']= dataframe["comments_lengths"].sum()
		report['AVG_COMMENTS']= self.dicimal_resolve(report["TOTAL_COMMENTS"] / len(dataframe))

		dataframe['ratings_approaches'] = dataframe['ratings'].apply(lambda x: sum(x))
		dataframe['ratings_lengths'] = dataframe['ratings'].apply(lambda x: len(x))
		report['TOTAL_RATINGS_APPROACHES']= dataframe["ratings_approaches"].sum()
		report['AVG_RATE']= self.dicimal_resolve(report['TOTAL_RATINGS_APPROACHES'] / dataframe["ratings_lengths"].sum())

		categories_= set(list(dataframe["category"]))
		classifications_= set(list(dataframe["parent_category"]))

		report["CATEGORIES"]= {}
		report["CLASSIFICATIONS"]= {}
		for cat_ in categories_:
			report["CATEGORIES"][self.helper.categories.get_category_by_id(cat_).name["EN"]]= len(dataframe.loc[dataframe["category"] == cat_])
		
		for pcat_ in classifications_:
			report["CLASSIFICATIONS"][self.helper.categories.get_parent_category_by_id(pcat_).name["EN"]]= len(dataframe.loc[dataframe["parent_category"] == pcat_])

		self.interactions_report= report

	def trending(self):
		dataframe= self.articles_df
		dataframe['read_time_values'] = dataframe['read_time'].apply(lambda x: sum(x.values()))
		dataframe['comments_lengths'] = dataframe['comments'].apply(lambda x: len(x))
		dataframe['ratings_lengths'] = dataframe['ratings'].apply(lambda x: sum(x))
		dataframe['ratings_approaches'] = dataframe['ratings'].apply(lambda x: len(x))

		dataframe['tranding_indicator']= dataframe['read_time_values'] + dataframe['comments_lengths'] + dataframe['ratings_approaches'] + dataframe['views'] + dataframe['saves']
		
		dataframe= dataframe.sort_values(by='tranding_indicator', ascending= False, ignore_index= True)
		self.all_articles= dataframe