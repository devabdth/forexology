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
			{'name': 'rounds', 'type': list},
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
			'title': self.name,
			'bio': self.bio,
			'rounds': self.tags,
		}

class CourseRound:
	'''
		Parametars:
			- id: str
			- round_number: int
			- fee: float
			- status: int
			- time: str
			- applicants: list
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'time', 'type': str},
			{'name': 'status', 'type': int},
			{'name': 'round_number', 'type': int},
			{'name': 'fee', 'type': float},
			{'name': 'applicants', 'type': list},
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
			'time': self.time,
			'status': self.status,
			'round_number': self.round_number,
			'fee': self.fee,
			'applicants': self.applicants,
		}
