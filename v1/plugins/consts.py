from os.path import abspath, join, dirname
from json import loads
class Consts:
	def __init__(self):
		with open(abspath(join(dirname(__file__), '../jsons/routers.json'))) as f:
			data= loads(f.read())
			self.admin_publish_form_routes= data['ADMIN_PUBLISH_ROUTE']

