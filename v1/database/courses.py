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

	def write_data(self, new_entry: dict= None):
		try:
			if new_entry is not None:
				self.all_courses.append(new_entry)
			data= {course.id: course.to_dict() for course in self.all_courses}
			with open(self.courses_file, 'w') as f:
				dump(data, f)
				return True
		except Exception as e:
			print(e)
			return False
	
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

	def create_course(self, payload, new_cover):
		try:
			payload['id']= secrets.token_hex(12)
			payload['sessions']= {}
			payload['price']= float(payload['price'])
			payload['students']= []
			payload['applications_list']= []
			payload['active']= True
			course= Course(payload)
			new_cover.save(abspath(join(dirname(__file__), '../assets/courses/covers/', '{}.{}'.format(payload['id'], new_cover.filename.split('.')[-1]))))			
			return self.write_data(new_entry= course)
			return True
		except Exception as e:
			print(e)
			return False
		
	def update_course(self, course, new_cover= None):
		try:
			for course_ in self.all_courses:
				if course_.id == course.id:
					self.all_courses[self.all_courses.index(course_)] = course
					if not new_cover is None:
						new_cover.save(abspath(join(dirname(__file__), '../assets/courses/covers/', '{}.{}'.format(course.id, new_cover.filename.split('.')[-1]))))
					return self.write_data()
			return False
		except Exception as e:
			print(e)
			return False
		
	def create_course_application(self, course, application, current_user_id):
		try:
			self.load_courses()
			course= self.get_course_by_id(course)
			applications_list= course.applications_list
			applications_df= DataFrame(applications_list, columns=['name', 'email', 'phone', "userId"])
			applications_df= applications_df.loc[applications_df['userId'] == current_user_id]
			applications_df= applications_df.loc[applications_df['name'] == application['name']]
			applications_df= applications_df.loc[applications_df['email'] == application['email']]
			applications_df= applications_df.loc[applications_df['phone'] == application['phone']]
			if len(applications_df) != 0:
				return -1
			application['userId']= current_user_id
			applications_list.append(application)
			course.applications_list= applications_list
			result= self.update_course(course)
			if result:
				return 1
			return 0
		except Exception as e:
			print(e)
			return 0

	def handle_course_request(self, status, course_id, request):
		try:
			self.load_courses()
			course= self.get_course_by_id(course_id)
			applications_list= course.applications_list
			applications_df= DataFrame(applications_list, columns=['name', 'email', 'phone', 'userId'])
			applications_df= applications_df.loc[applications_df['userId'] == request['userId']]
			i= applications_df.loc[applications_df['userId'] == request['userId']].index
			i= applications_df[applications_df['userId'] == request['userId']].index
			if len(applications_df) == 0:
				return False
   
			applications_df.drop(i)
			applications_list= []
			for _, row in applications_df.iterrows():
				row= dict(row)
				if not row['userId'] == request['userId']:
					applications_list.append(row)
			course.applications_list= applications_list
			if status:
				course.students.append(request['userId'])
			self.update_course(course)
			return True
		except Exception as e:
			print(e)
			return False
