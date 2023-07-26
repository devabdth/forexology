from os.path import dirname, abspath, join, exists
from os import remove as remove_file
from sys import path
from json import loads, dumps, dump
import secrets
from plugins.consts import Consts

path.insert(0, '../')

from models.course import Course, CourseRound

class CoursesDatabaseHelper:
	def __init__(self):
		self.consts: Consts= Consts()
		self.covers_dir: str= abspath(join(dirname(__file__), '../assets/covers/courses/'))
		self.promos_dir: str= abspath(join(dirname(__file__), '../assets/promos/courses/'))
		self.cources_file: str= abspath(join(dirname(__file__), '../jsons/courses.json'))
		self.load_data()


	def load_data(self):
		with open(self.cources_file) as f:
			data= dict(loads(f.read()))
			self.courses= [
				Course({
					"id": c["id"],
					"title": c["title"],
					"bio": c["bio"],
					"rounds": [CourseRound(cr) for cr in c["rounds"]],
				}) for c in data.values()
			]


	def write_data(self):
		try:
			data= {
				c.id: {
					"id": c.id,
					"title": c.title,
					"bio": c.bio,
					"rounds": [cr.to_dict() for cr in c.rounds],
				} for c in self.courses
			}

			with open(self.cources_file, "w") as f:
				dump(data, f)
				return True
		except Exception as e:
			print(e)
			return False

	def get_course_by_id(self, course_id):
		for course in self.courses:
			if course.id == course_id:
				return course

		return None

	def create_category(self, data, cover, promo):
		try:
			course_id= str(secrets.token_hex(12))
			rounds= []
			for round_ in data["rounds"]:
				round_id= str(secrets.token_hex(24))
				rounds.append(
					CourseRound({
						"id": round_id,
						"round_number": round_["round_number"],
						"fee": round_["fee"],
						"status": round_["status"],
						"time": round_["time"],
						"applicants": [],
					})
				)

			course= Course({
				"id": course_id,
				"title": {
					"EN": data["enName"],
					"AR": data["arName"],
				},
				"bio": {
					"EN": data["enBio"],
					"AR": data["arBio"],
				},
				"rounds": rounds
			})

			self.courses.append(course)
			res= self.write_data()
			if res: 
				cover.save(join(self.covers_dir), f'{course_id}.{cover.filename.split(".")[-1]}')
				promo.save(join(self.promos_dir), f'{course_id}.{promo.filename.split(".")[-1]}')
				return True
			return False
		except Exception as e:
			print(e)
			return False