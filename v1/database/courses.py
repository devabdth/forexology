from os.path import dirname, join, abspath, exists
from json import loads, load, dumps, dump
from pandas import DataFrame
import secrets
from datetime import datetime
from models.course import Course
from plugins.consts import Consts


class CoursesDatabaseHelper:
	def __init__(self):
		self.consts: Consts= Consts()
		self.courses_file= abspath(join(dirname(__file__), '../jsons/courses.json'))
		self.courses_cover_dir= abspath(join(dirname(__file__), '../assets/courses/covers'))
		self.courses_sessions_material_dir= abspath(join(dirname(__file__), '../assets/courses/sessions'))


	def load_courses(self):
		self.all_courses= []
		if not exists(self.courses_file):
			with open(self.courses_file, 'w') as f:
				dump({}, f)

		with open(self.courses_file, 'r') as f:
			courses_data= dict(loads(f.read()))
			self.all_courses= [Course(course) for course in courses_data.values()]

	def get_course_by_id(self, course_id):
		try:
			for course in self.all_courses:
				if course.id == course_id:
					return course
				
			return None
		except Exception as e:
			print(e)
			return None
		
	def get_course_cover_by_id(self, course_id):
		try:
			for ext in self.consts.covers_supported_extenstions:
				file_path= abspath(join(self.courses_cover_dir, f'{course_id}.{ext}'),)
				if exists(file_path):
					return file_path
			return None
			
		except Exception as e:
			print(e)
			return None

	def create_course(self, payload, files):
		try:
			payload['id']= secrets.token_hex(12)
			payload['sessions']= []
			payload['active']= True
			course= Course(payload)
			return True
		except Exception as e:
			print(e)
			return False

