from datetime import datetime
from os.path import dirname, abspath, join, exists
from sys import path
from json import loads, dumps
path.insert(0, '../')

from models.ad import Ad
class AdsDatabaseHelper:
	def __init__(self):
		self.ads_file: str= abspath(join(dirname(__file__), '../jsons/ads.json'))
		self.active_ads: list= []
		self.archived_ads: list= []

		with open(self.ads_file, 'r') as f:
			data= dict(loads(f.read()))

			for ad in data.values():
				ad= Ad(ad)
				availablity_date= ad.available_till.split(' ')[0]
				year, month, day= availablity_date.split('-')

				availablity_time= ad.available_till.split(' ')[1]
				hour, mn, _= availablity_time.split(':')

				deadline= datetime(int(year), int(month), int(day), int(hour), int(mn))
				now= datetime.now()

				if now > deadline:
					self.archived_ads.append(ad)
				else:
					self.active_ads.append(ad)

				if ad.id == 'HOME_SCREEN_AD':
					print(ad)
					self.entry_home_ad= ad



	def check_if_ad_is_active(self, ad):
		return ad in self.active_ads

	def get_ad_by_id(self, ad_id: str):
		for ad in self.active_ads:
			if ad.id == ad_id:
				return ad
