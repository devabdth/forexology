from flask import Flask, session, render_template, url_for, request, redirect
from json import dumps, loads

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
				res= self.helper.courses.update_course(course)
				return self.app.response_class(status= 200 if res else 500)
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
					request= body['request']
				)
				print([res, body['status']])
				if res and body['status']:
					user_data= self.helper.users.get_user_by_id(body['request']['userId'])
					user_data.courses[body['courseId']]= {"completed_sessions": []}
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