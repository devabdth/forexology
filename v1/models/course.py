class Course:
	'''
		Parametars:
			- id: str
			- title: dict
			- bio: dict
			- rounds: list
	'''

	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'title', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'price', 'type': float},
			{'name': 'active', 'type': bool},
			{'name': 'content_list', 'type': list},
			{'name': 'sessions', 'type': dict},
			{'name': 'applications_list', 'type': list},
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
			'id': self.id,
			'title': self.title,
			'bio': self.bio,
			'price': self.price,
			'content_list': self.content_list,
			"active": self.active,
			"sessions": self.sessions,
			"applications_list": self.applications_list,
		}
