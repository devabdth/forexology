from database.helper import DatabaseHelper
from analyze_lab.feed.feed_generator import FeedGenerator
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for, send_file, request, redirect
from json import dumps, loads
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class CoursesRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()
        self.feed_generator: FeedGenerator= FeedGenerator()

    def setup(self):
        self.assign_courses_index()
        self.assign_course_index()
        self.assign_course_dashboard_index()
        self.assign_course_application_post()
        self.assign_courses_cover_index()
        self.assign_completed_session_assignment()

    def assign_course_application_post(self):
        @self.app.route(self.consts.course_route, methods=['POST'])
        def course_application_post(course_id):
            try:
                current_user_id= session.get("CURRENT_USER_ID", None)
                if current_user_id == None:
                    return redirect('/login/')

                body= dict(loads(request.data))
                result= self.helper.courses.create_course_application(
                    course= course_id, application= body, current_user_id= current_user_id
                )

                if result == 1:
                    return self.app.response_class(status= 201)
                elif result == -1:
                    return self.app.response_class(status= 405)

                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
    
    def assign_course_index(self):
        @self.app.route(self.consts.course_route, methods=['GET'])
        def course_index(course_id):
            try:
                self.helper.courses.load_courses()
                course= self.helper.courses.get_course_by_id(course_id)
                if course is None:
                    return self.app.response_class(status= 404)
                lang = session.get('LANG', 'AR')
                mode = session.get('MODE', 'LIGHT')
                self.helper.ads.load_data()
                self.layout.load()
                current_user_id= session.get("CURRENT_USER_ID", None)
                user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
                return render_template(
                    '/website/course.html',
                    course= course,
                    user_data= user_data,
                    content=self.content,
                    cfg=self.cfg,
                    consts=self.consts,
                    lang=lang,
                    mode=mode,
                    db_helper=self.helper,
                    utils=self.utils,
                    layout=self.layout,
                    dumps=dumps
                )
                
            
            
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)

    def assign_completed_session_assignment(self):
        @self.app.route(f"{self.consts.course_route}/dashboard/completedSession/", methods=['PATCH'])
        def completed_session_assignment(course_id):
            try:
                current_user_id= session.get("CURRENT_USER_ID", None)
                user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
                if user_data is None:
                    raise Exception('No User Found!')
                sessionId= loads(request.data)['session']
                if not sessionId in user_data.courses[course_id]["completed_sessions"]:
                    user_data.courses[course_id]["completed_sessions"].append(sessionId)
                    res= self.helper.users.update_user(payload= {"id": user_data.id, "courses": user_data.courses})
                    return self.app.response_class(status= 200 if True else 500)
                return self.app.response_class(status= 400)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
    
    def assign_course_dashboard_index(self):
        @self.app.route(f"{self.consts.course_route}/dashboard/", methods=['GET'])
        def course_dashboard_index(course_id):
            try:
                self.helper.courses.load_courses()
                course= self.helper.courses.get_course_by_id(course_id)
                print(course)
                if course is None:
                    return self.app.response_class(status= 404)
                lang = session.get('LANG', 'AR')
                mode = session.get('MODE', 'LIGHT')
                self.helper.ads.load_data()
                self.layout.load()
                current_user_id= session.get("CURRENT_USER_ID", None)
                user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
                return render_template(
                    '/website/courseDashboard.html',
                    course= course,
                    user_data= user_data,
                    content=self.content,
                    cfg=self.cfg,
                    consts=self.consts,
                    lang=lang,
                    mode=mode,
                    db_helper=self.helper,
                    utils=self.utils,
                    layout=self.layout,
                    dumps=dumps
                )
                
            
            
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
                
    
    def assign_courses_cover_index(self):
        @self.app.route(self.consts.course_cover_route, methods=['GET'])
        def courses_cover_index(course_id):
            try:
                self.helper.courses.load_courses()
                course= self.helper.courses.get_course_by_id(course_id)
                if course is None:
                    return self.app.response_class(status= 404)
                course_cover= self.helper.courses.get_course_cover_by_id(course_id)
                if course_cover is None:
                    return self.app.response_class(status= 404)
                return send_file(course_cover)
            
            
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
                

    def assign_courses_index(self):
        @self.app.route(self.consts.courses_route, methods=["GET"])
        def courses_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.ads.load_data()
            self.helper.courses.load_courses()
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
            return render_template(
                '/website/courses.html',
                user_data= user_data,
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                db_helper=self.helper,
                utils=self.utils,
                layout=self.layout,
                dumps=dumps
            )
