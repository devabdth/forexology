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
			{"name": "phone_number", "type": str},
			{"name": "email", "type": str},
			{"name": "password", "type": str},
			{"name": "joined_in", "type": str},
			{"name": "prefered_categories", "type": list},
			{"name": "prefered_parent_categories", "type": list},
			{"name": "followed_writers", "type": list},
			{"name": "saves", "type": list},
			{"name": "comments", "type": list},
			{"name": "ratings", "type": list},
			{"name": "likes", "type": list},
			{"name": "last_log_in", "type": str},
			{"name": "current_reading_article", "type": str},
			{"name": "current_reading_section", "type": str},
			{"name": "courses", "type": dict},
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
			"phone_number": self.phone_number,
			"email": self.email,
			"password": self.password,
			"joined_in": self.joined_in,
			"prefered_categories": self.prefered_categories,
			"prefered_parent_categories": self.prefered_parent_categories,
			"followed_writers": self.followed_writers,
			"saves": self.saves,
			"comments": self.comments,
			"ratings": self.ratings,
			"likes": self.likes,
			"last_log_in": self.last_log_in,
			"current_reading_article": self.current_reading_article,
			"current_reading_section": self.current_reading_section,
			"courses": self.courses
		}