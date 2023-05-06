class User:
	'''
		Parametars:
			id: str
			name: str
			bio: str
			joined_in: str
			prefered_categories: list
			prefered_parent_categories: list
			saved_articles: list
			followed_articles: list
			last_log_in: str
	'''
	def __init__(self, payload):
		self.params: list= [
			{"name": "id", "type": str},
			{"name": "name", "type": str},
			{"name": "bio", "type": str},
			{"name": "joined_in", "type": str},
			{"name": "prefered_categories", "type": list},
			{"name": "prefered_parent_categories", "type": list},
			{"name": "saved_articles", "type": list},
			{"name": "followed_articles", "type": list},
			{"name": "last_log_in", "type": str},
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
			"id": self.id,
			"name": self.name,
			"bio": self.bio,
			"joined_in": self.joined_in,
			"prefered_categories": self.prefered_categories,
			"prefered_parent_categories": self.prefered_parent_categories,
			"saved_articles": self.saved_articles,
			"followed_articles": self.followed_articles,
			"last_log_in": self.last_log_in,
		}