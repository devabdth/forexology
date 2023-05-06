from os.path import dirname, abspath, join, exists
from sys import path
from json import loads, dumps
path.insert(0, '../')

from models.category import Category, ParentCategory

class CategoriesDatabaseHelper:
	def __init__(self):
		self.cats_file: str= abspath(join(dirname(__file__), '../jsons/categories.json'))
		self.active_cats: list= []
		self.archived_cats: list= []
		self.parent_cats: list= []
		with open(self.cats_file, 'r') as f:
			data= dict(loads(f.read()))

			for cat in data['activeCategories']:
				cat_= Category(cat)
				self.active_cats.append(cat_)

			for cat in data['archivedCategories']:
				cat_= Category(cat)
				self.active_cats.append(cat_)

			for cat in data['parentCategories']:
				categories_= []
				for category in cat['categories']:
					for active_cat in self.active_cats:
						if active_cat.id == category:
							categories_.append(active_cat)

				cat['categories']= categories_
				cat_= ParentCategory(cat)
				self.parent_cats.append(cat_)


	def get_parent_category_by_id(self, pcid):
		for pcat in self.parent_cats:
			if pcat.id == pcid:
				return pcat

	def get_category_by_id(self, cid):
		for cat in self.active_cats:
			if cat.id == cid:
				return cat

	def multiple_categories_by_id(self, cats_ids):
		result= []
		for cat in self.active_cats:
			if cat.id in cats_ids:
				result.append(cat)

		return result