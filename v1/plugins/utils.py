from database.helper import DatabaseHelper

class Utils:
	def mutliple_to_dicts(self, input_: list, params: dict= None):
		return [i.to_dict() for i in input_]
