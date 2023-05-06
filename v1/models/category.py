class ParentCategory:
	'''
		Parametars:
			id: str
			name: dict,
			bio: dict,
			categories: list
			main_route: str
			tags: list

	'''
	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'name', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'categories', 'type': list},
			{'name': 'tags', 'type': list},
			{'name': 'main_route', 'type': str},
		]


		for param in self.params:
			if param['name'] in payload.keys():
				if type(payload[param['name']]) != param['type']:
					raise TypeError('"{}"" Expected Type: {} but got {}'.format(param['name'],  param['type'], type(payload[param['name']])))

				setattr(self, param['name'], payload[param['name']])
			else:
				raise KeyError('Parameter "{}" not found'.format(param['name']))

	def to_dict(self, without_cats= False): 
		if without_cats:
			return {
				'name': self.name,
				'bio': self.bio,
				'categories': [cat.id for cat in self.categories],
				'tags': self.tags,
				'main_route': self.main_route
			}

		return {
			'name': self.name,
			'bio': self.bio,
			'categories': self.categories,
			'tags': self.tags,
			'main_route': self.main_route
		}



class Category:
	'''
		Prametars:
			name: dict
			bio: dict
			id: str
			main_route: str
			secondary_route: str
			prefered_keywords: list
			prefered_main_carousel_articles: list
			tags: list

	'''
	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'name', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'main_route', 'type': str},
			{'name': 'secondary_route', 'type': str},
			{'name': 'prefered_keywords', 'type': list},
			{'name': 'prefered_main_carousel_articles', 'type': list},
			{'name': 'tags', 'type': list},
		]

		for param in self.params:
			if param['name'] in payload.keys():
				if type(payload[param['name']]) != param['type']:
					raise TypeError('"{}"" Expected Type: {} but got {}'.format(param['name'],  param['type'], type(payload[param['name']])))

				setattr(self, param['name'], payload[param['name']])
			else:
				raise KeyError('Parameter "{}" not found'.format(param['name']))


	def to_dict(self):
		return {
			'name': self.name,
			'bio': self.bio,
			'id': self.id,
			'main_route': self.main_route,
			'secondary_route': self.secondary_route,
			'prefered_keywords': self.prefered_keywords,
			'prefered_main_carousel_articles': self.prefered_main_carousel_articles,
			'tags': self.prefered_main_carousel_articles,
		}
