from models.writer import Writer
from plugins.layout import Layout
from os.path import abspath, dirname, join
from json import loads, dumps, dump
from pandas import DataFrame
from datetime import datetime
import secrets


class WritersDatabaseHelper:
	def __init__(self):
		self.bgfree_dir= abspath(join(dirname(__file__), '../assets/writers/bgFree'))
		self.profile_dir= abspath(join(dirname(__file__), '../assets/writers/images'))
		self.covers_dir= abspath(join(dirname(__file__), '../assets/writers/covers'))
		self.layout: Layout= Layout()
		self.load_data()

	def write_data(self, new_writer= None):
		try:
			data= {writer.id: writer.to_dict() for writer in self.all_writers}
			if not new_writer is None:
				new_writer= new_writer.to_dict()
				data[new_writer['id']]= new_writer

			with open(abspath(join(dirname(__file__), '../jsons/writers.json')), 'w') as f:
				dump(data, f)
				f.close()
				return True
		except Exception as e:
			print(e)
			return False

	def write_invitations_data(self):
		try:
			data= {row['invId']: row for row in self.all_writers_invitations}

			with open(abspath(join(dirname(__file__), '../jsons/writersInvitations.json')), 'w') as f:
				dump(data, f)
				f.close()
				return True
		except Exception as e:
			print(e)
			return False

	def load_data(self):
		self.all_writers= []
		self.all_writers_invitations= []
		with open(abspath(join(dirname(__file__), '../jsons/writersInvitations.json'))) as f:
			data= dict(loads(f.read()))
			data= list(data.values())
			self.all_writers_invitations= [dict(snippet) for snippet in data]

		with open(abspath(join(dirname(__file__), '../jsons/writers.json'))) as f:
			data= dict(loads(f.read()))
			data= list(data.values())
			self.writers_df= DataFrame(data, columns=[
				"id", "name", "bio", "email",
				"joined_in", "password", "tags",
				"prefered_category", "prefered_parent_category",
				"social_media_links", "suspensed"
			])
			self.all_writers= [Writer(snippet) for snippet in data]

	def get_writer_by_id(self, writer_id: str):
		for writer in self.all_writers:
			if writer.id == writer_id:
				return writer
		return None
	

	def get_writer_by_email(self, writer_email: str):
		for writer in self.all_writers:
			if writer.email == writer_email:
				return writer
		
		for writer in self.all_writers_invitations:
			if writer['email'] == writer_email:
				return writer
		
		return None
	
	def get_writers_by_ids(self, writers: list):
		if len(writers) == 0:
			return []
		
		writers_df= self.writers_df.loc[self.writers_df.id.isin(writers)]
		if len(writers_df) == 0:
			return []
		
		writers_= [Writer(row) for _, row in writers_df.iterrows()]
		return writers_
	
	def create_writer(self, payload, cover, profile, bgFree):
		try:
			new_id= str(secrets.token_hex(12))
			writer_= Writer({
				"id": new_id,
				"name": payload['name'],
				"bio": payload['bio'],
				"email": payload['email'],
				"password": payload["password"],
				"joined_in": str(datetime.now()),
				"suspensed": False,
				"tags": payload["tags"],
				"prefered_category": payload["prefered_category"],
				"prefered_parent_category": payload["prefered_parent_category"],
				"social_media_links": {},
			})

			res= self.write_data(new_writer= writer_)
			if res:
				bgFree.save(join(self.bgfree_dir, f'{new_id}.{bgFree.filename.split(".")[-1]}'))
				profile.save(join(self.profile_dir, f'{new_id}.{profile.filename.split(".")[-1]}'))
				cover.save(join(self.covers_dir, f'{new_id}.{cover.filename.split(".")[-1]}'))
				return True
			return False
		except Exception as e:
			print(e)
			return False
		

	def update_writer(self, **kwargs):
		try:
			if 'body' in kwargs.keys():
				body= kwargs['body']
				if not 'id' in body.keys():
					return False
				
				writer_id= body['id']
				del body['id']

				cover= kwargs['cover'] if 'cover' in kwargs.keys() else None
				profile= kwargs['profile'] if 'profile' in kwargs.keys() else None
				bgfree= kwargs['bgfree'] if 'bgfree' in kwargs.keys() else None

				for writer in self.all_writers:
					if writer.id == writer_id:
						for k in body.keys():
							writer.__setattr__(k, body[k])
						
					res= self.write_data()
					if res:
						if cover is not None:
							cover.save(join(self.covers_dir, f'{writer_id}.{cover.filename.split(".")[-1]}'))
						if bgfree is not None:
							bgfree.save(join(self.covers_dir, f'{writer_id}.{bgfree.filename.split(".")[-1]}'))
						if profile is not None:
							profile.save(join(self.profiles_dir, f'{writer_id}.{profile.filename.split(".")[-1]}'))

						return True

			return False
		except Exception as e:
			print(e)
			return False

	def delete_writer(self, payload):
		pass

	def add_writer_invitation(self, email):
		try:
			for inv in self.all_writers_invitations:
				if inv['email'] == email:
					return -1
				
			inv_id= str(secrets.token_hex(24))
			self.all_writers_invitations.append({
				'email': email,
				'invId': inv_id,
			})

			res= self.write_invitations_data()
			if res:
				return inv_id
		except Exception as e:
			print(e)
			return None

	def delete_writer_invitation(self, email):
		try:
			for inv in self.all_writers_invitations:
				if inv['email'] == email:
					del self.all_writers_invitations[self.all_writers_invitations.index(inv)]
					res= self.write_invitations_data()
					if res:
						return True
			return -1
		except Exception as e:
			print(e)
			return None