class Writer:
	'''
		Parameter:
			id: str
			name: dict
			bio: dict
			joined_in: str
			tags: list
			prefered_category: list
			prefered_parent_category: list
			social_media_links: dict
	'''


	def __init__(self, payload):
		self.params: list= [
			{"name": "id", "type": str},
			{"name": "name", "type": dict},
			{"name": "bio", "type": dict},
			{"name": "joined_in", "type": str},
			{"name": "tags", "type": list},
			{"name": "prefered_category", "type": list},
			{"name": "prefered_parent_category", "type": list},
			{"name": "social_media_links", "type": dict},
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
			"tags": self.tags,
			"prefered_category": self.prefered_category,
			"prefered_parent_category": self.prefered_parent_category,
			"social_media_links": self.social_media_links,
		}