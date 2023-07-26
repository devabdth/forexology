class OnlineCourse:
	'''
		Parametars:
			- id: str
			- title: dict
			- bio: dict
			- fee: float
			- time: str
			- sections: list
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'title', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'fee', 'type': float},
			{'name': 'time', 'type': str},
			{'name': 'sections', 'type': list},
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
			'fee': self.fee,
			'time': self.time,
			'sections': self.sections,
		}

class OnlineCourseSection:
	'''
		Parametars:
			- id: str
			- title: dict
			- bio: dict
			- content_type: str
			- content: str
			- assessment: OnlineCourseSectionAssessment
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'title', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'content_type', 'type': str},
			{'name': 'content', 'type': str},
			{'name': 'assessment', 'type': OnlineCourseSectionAssessment},
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
			'content_type': self.content_type,
			'content': self.content,
			'assessment': self.assessment,
		}


class OnlineCourseSectionAssessment:
	'''
		Parametars:
			- id: str
			- title: dict
			- bio: dict
			- questions: list
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'title', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'questions', 'type': list},
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
			'questions': self.questions,
		}


class OnlineCourseSectionAssessmentQuestion:
	'''
		Parametars:
			- id: str
			- title: dict
			- choises: dict
			- right_choise: int
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'title', 'type': dict},
			{'name': 'choises', 'type': dict},
			{'name': 'right_choise', 'type': int},
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
			'choises': self.bio,
			'right_choise': self.questions,
		}

