from models.user import User
from plugins.layout import Layout
from os.path import abspath, dirname, join
from json import loads, dumps, dump
from pandas import DataFrame
from datetime import datetime
import secrets
from plugins.consts import Consts
from bson.objectid import ObjectId
import pymongo


class UsersDatabaseHelper:
	def __init__(self, client: pymongo.MongoClient):
		self.profile_dir= abspath(join(dirname(__file__), '../assets/users/images'))
		self.covers_dir= abspath(join(dirname(__file__), '../assets/users/covers'))
		self.consts: Consts= Consts()
		self.client: pymongo.MongoClient = client
		self.database = self.client["forexology"]
		self.users_collection = self.database["users"]

		self.all_users: list = [
		]

		self.refresh_all_users()


	def refresh_all_users(self):
		try:
			self.all_users = [User(user) for user in list(self.users_collection.find())]
		except Exception as e:
			print(e)

	def create_user(self, dict_):
		try:
			res= self.users_collection.insert_one(dict_)
			print(res)
			return res.inserted_id
		except Exception as e:
			print(e)
			return False



	def get_user_by_id(self, id):
		users = self.users_collection.find({'_id': ObjectId(id)})
		return User(users[0])
	
	def get_user_by_email(self, email):
		try:
			users = self.users_collection.find({'email': email})
			return User(users[0])
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

			if 'id' in payload.keys():
				user_id= payload['id']
				del payload['id']

			self.users_collection.find_one_and_upate({'_id': ObjectId(user_id)}, {'$set': payload.to_dict()})
			self.refresh_all_users()

			return True
		except Exception as e:
			print(e)
			return False
