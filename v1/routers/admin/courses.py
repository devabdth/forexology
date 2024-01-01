from flask import Flask, session, render_template, url_for, request, redirect
from json import dumps, loads
import datetime

from sys import path
path.insert(0, '../')
path.insert(1, '../../')

from plugins.config import Config
from plugins.content import Content
from plugins.consts import Consts
from plugins.utils import Utils
from plugins.layout import Layout
from database.helper import DatabaseHelper


class CoursesAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_index()
		self.assign_create_course()
		self.assign_update_course()
		self.assign_applications_traffic()


	def assign_update_course(self):
		@self.app.route(f'{self.consts.admin_courses_route}', methods=['PATCH'])
		def update_course():
			try:
				formData= dict(request.form)
				payload= loads(formData['payload'])
				self.helper.courses.load_courses()
				course= self.helper.courses.get_course_by_id(payload['id'])
				if course is None:
					return self.app.response_class(status= 500)

				course.title= payload['title']
				course.bio= payload['bio']
				course.price= float(payload['price'])
				course.content_list= payload['content_list']
				new_cover= request.files['cover'] if 'cover' in request.files.keys() else None
				res= self.helper.courses.update_course(course, new_cover= new_cover)
				return self.app.response_class(status= 200 if res else 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_create_course(self):
		@self.app.route(f'{self.consts.admin_courses_route}', methods=['POST'])
		def create_course():
			try:
				formData= dict(request.form)
				payload= loads(formData['payload'])
				self.helper.courses.load_courses()
				new_cover= request.files['cover'] if 'cover' in request.files.keys() else None
				res= self.helper.courses.create_course(payload, new_cover= new_cover)
				return self.app.response_class(status= 201 if res else 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
	def assign_applications_traffic(self):
		@self.app.route(f'{self.consts.admin_courses_route}/applications/', methods=['PATCH'])
		def applications_traffic():
			try:
				body= loads(request.data)
				res= self.helper.courses.handle_course_request(
					status= body['status'],
					course_id= body['courseId'],
					request= body['request'],
				)
				if res and body['status']:
					user_data= self.helper.users.get_user_by_id(body['request']['userId'])
					if 'startPoint' in body.keys() and body['startPoint'] != None:
						self.helper.courses.load_courses()
						course= self.helper.courses.get_course_by_id(body['courseId'])
						start_point_index= list(course.sessions.keys()).index(body['startPoint'])
						user_data.courses[body['courseId']]= {"completed_sessions": list(course.sessions.keys())[start_point_index:]}
					else:
						user_data.courses[body['courseId']]= {"completed_sessions": []}
					
					self.helper.courses.load_courses()
					course= self.helper.courses.get_course_by_id(body['courseId'])
					sessions= list(course.sessions.keys())[start_point_index:]
					sessions_schdule= {}
					today = datetime.datetime.now()
					epoch= datetime.datetime.utcfromtimestamp(0)
					sessions_schdule[sessions[0]]= (today - epoch).total_seconds() * 1000
					sessions= sessions[1:]
					schudle_data = today + datetime.timedelta( (6-today.weekday()) % 7 )
					for session in sessions:
						if not sessions.index(session) % 2:
							schudle_data = today + datetime.timedelta( (6-today.weekday()) % 7 )
						else:
							schudle_data = today + datetime.timedelta( (2-today.weekday()) % 7 )
						
						schudle_data= schudle_data.replace(hour=19, minute= 0, second= 0)
						today= schudle_data
						schudle_data= (schudle_data - epoch).total_seconds() * 1000
						sessions_schdule[session]= str(schudle_data)
						user_data.courses[body['courseId']]= {"sessions_schdule": sessions_schdule}

					self.helper.users.update_user(payload= {"courses": user_data.courses, "id": user_data.id})
				return self.app.response_class(status= 200 if res else 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_index(self):
		@self.app.route(self.consts.admin_courses_route, methods=["GET"])
		def admin_courses_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.helper.courses.load_courses()
			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/courses.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				admin_data= self.helper.admins.get_admin_by_username(aid)
			)