from os.path import abspath, dirname, join
from json import loads, dump

class Layout:
	def __init__(self):
		layout_path= abspath(join(dirname(__file__), '../jsons/layout.json'))
		with open(layout_path) as f:
			data= dict(loads(f.read()))
			self.home_featured_writers: list= data['HOME_PAGE']['featuredWriters']
			self.home_featured_articles: list= data['HOME_PAGE']['featuredArticles']
			self.entry_section_ad: list= data['HOME_PAGE']['entrySectionAd']
			self.home_featuredj_obs: list= data['HOME_PAGE']['featuredJobs']
			self.home_featured_missed_articles: list= data['HOME_PAGE']['featuredMissedArticles']
			self.home_featured_random_articles: list= data['HOME_PAGE']['featuredRandomArticles']
			self.home_entry_section_ad: list= data['HOME_PAGE']['entrySectionAd']
			self.home_ad_space_one: list= data['HOME_PAGE']['adSpaceOne']
			self.home_ad_space_two: list= data['HOME_PAGE']['adSpaceTwo']
			self.home_ad_space_three: list= data['HOME_PAGE']['adSpaceThree']
			self.home_ad_space_four: list= data['HOME_PAGE']['adSpaceFour']
			self.home_ad_space_five: list= data['HOME_PAGE']['adSpaceFive']
			self.home_ad_space_six: list= data['HOME_PAGE']['adSpaceSix']
			self.home_ad_space_seven: list= data['HOME_PAGE']['adSpaceSeven']
			self.home_ad_space_eight: list= data['HOME_PAGE']['adSpaceEight']
			self.home_ad_space_nine: list= data['HOME_PAGE']['adSpaceNine']
			self.home_ad_space_ten: list= data['HOME_PAGE']['adSpaceTen']
			self.home_ad_space_eleven: list= data['HOME_PAGE']['adSpaceEleven']
			self.home_ad_space_twelve: list= data['HOME_PAGE']['adSpaceTwelve']

			self.categories_featured_categories: list= data['CATEGORIES_PAGE']['featuredCategories']
