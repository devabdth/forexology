from models.user import User
from plugins.layout import Layout
from os.path import abspath, dirname, join
from json import loads, dumps, dump
from pandas import DataFrame
from datetime import datetime
import secrets


class UsersDatabaseHelper:
	def __init__(self):
		self.profile_dir= abspath(join(dirname(__file__), '../assets/users/images'))
		self.covers_dir= abspath(join(dirname(__file__), '../assets/users/covers'))
		self.users= [
			User({
				"id": str(secrets.token_hex(12)),
				"name": "User Name",
				"bio": "This is my user bio!",
				"email": "a.tharwat@cubersio.com",
				"password": "1234567890",
				"joined_in": str(datetime.now()),
				"prefered_categories": [],
				"prefered_parent_categories": [],
				"followed_writers": [],
				"saves": [],
				"comments": [],
				"ratings": [],
				"likes": [],
				"last_log_in": str(datetime.now()),
				"current_reading_article": "",
				"current_reading_section": "",
			}) for _ in range(0, 10)
		]

	def get_user_by_id(self, id):
		return self.users[0]
	
	def get_user_by_email(self, email):
		try:
			for user in self.users:
				if user.email == email:
					return user
			return None
		except Exception as e:
			print(e)
			return None
		
	def update_user(self, **kwargs):
		try:
			if not ('payload' in kwargs.keys() or 'cover' in kwargs.keys() or 'profile' in kwargs.keys()):
				return False
			
			payload= kwargs['payload'] if 'payload' in kwargs.keys() else None
			cover= kwargs['cover'] if 'cover' in kwargs.keys() else None
			profile= kwargs['profile'] if 'profile' in kwargs.keys() else None

			return True
		except Exception as e:
			print(e)
			return False
