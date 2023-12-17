from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for, request, redirect
from json import dumps, loads
from sys import path
import random
from plugins.email_plugin import EmailPlugin
path.insert(0, '../')
path.insert(1, '../../')


class AuthRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_signup_index()
        self.assign_login_index()
        self.assign_logout_index()
        self.assign_login_confirmation()
        self.assign_password_reset_index()
        self.assign_password_reset_traffic()
        self.assign_signup_traffic()
        self.assign_create_user()

    def assign_create_user(self):
        @self.app.route(self.consts.join_route, methods=["POST"])
        @self.app.route(self.consts.signup_route, methods=["POST"])
        def create_user():
            try:
                body= loads(request.form['data'])
                
                files= request.files
                profile= files['PROFILE'] if 'PROFILE' in files.keys() else None
                cover= files['COVER'] if 'COVER' in files.keys() else None
                res= self.helper.users.create_user(
                    username= body['username'],
                    phone_number= body['phoneNumber'],
                    email= body['email'],
                    password= body['password'],
                    writers= body['writers'],
                    profile= profile,
                    cover= cover
                )

                if res != None:
                    session['CURRENT_USER_ID']= res
                    return self.app.response_class(status= 201)
                    
                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)

    def assign_login_confirmation(self):
        @self.app.route(self.consts.login_route, methods=["PATCH"])
        def login_confirmation():
            try:
                body= dict(loads(request.data))
                user= self.helper.users.get_user_by_email(body['email'])
                if user is None:
                    return self.app.response_class(status= 404)
                
                if user.password == body['password']:
                    session['CURRENT_USER_ID']= user.id
                    return self.app.response_class(status= 200)
                else:
                    return self.app.response_class(status= 401)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)


    def assign_logout_index(self):
        @self.app.route(self.consts.logout_route, methods=["PATCH"])
        def logout():
            try:
                session.pop('CURRENT_USER_ID')
                return self.app.response_class(status= 200)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
            

    def assign_login_index(self):
        @self.app.route(self.consts.login_route, methods=["GET"])
        def login_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            current_user_id= session.get("CURRENT_USER_ID", None)
            if current_user_id != None:
                return redirect(self.consts.profile_route)            
            return render_template(
                '/website/login.html',
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
        
    def assign_password_reset_traffic(self):
        @self.app.route(self.consts.password_reset, methods=["PATCH"])
        def password_reset_traffic():
            try:
                body= dict(loads(request.data))
                if 'mode' not in body.keys():
                    return self.app.response_class(status= 500)
                
                if body['mode'] == 'EMAIL':
                    res= self.helper.users.get_user_by_email(body['email'])
                    if res is None:
                        return self.app.response_class(status= 404)
                    code = str(random.randint(0, 999999))
                    session['VERIFICATION_CODE']= code
                    EmailPlugin().send_raw_email(
                        msg= 'Welcome to Forexology! Your verfication code is: {}'.format(code),
                        recipent= body['email'],
                        subject="Verify your Email"
				    )

                    return self.app.response_class(status= 200)
                elif body['mode'] == 'CODE':
                    if body['code'] == session.get('VERIFICATION_CODE'):
                        return self.app.response_class(status= 200)
                    return self.app.response_class(status= 401)
                elif body['mode'] == 'CHANGE_PASSWORD':
                    res= self.helper.users.update_user(payload= {'password': body['password']})
                    print(res)
                    if res:
                        return self.app.response_class(status= 200)
                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
            

    def assign_password_reset_index(self):
        @self.app.route(self.consts.password_reset, methods=["GET"])
        def password_reset_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            current_user_id= session.get("CURRENT_USER_ID", None)
            if current_user_id != None:
                return redirect(self.consts.profile_route)            
            return render_template(
                '/website/password_reset.html',
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

    def assign_signup_traffic(self):
        @self.app.route(self.consts.join_route, methods=["PATCH"])
        @self.app.route(self.consts.signup_route, methods=["PATCH"])
        def signup_traffic():
            try:
                body= dict(loads(request.data))
                if 'mode' not in body.keys():
                    return self.app.response_class(status= 500)
                
                if body['mode'] == 'CHECKING_EMAIL_UNIQUENESS':
                    res= self.helper.users.get_user_by_email(body['email'])
                    if res is None:
                        code = str(random.randint(0, 999999))
                        session['VERIFICATION_CODE']= code
                        EmailPlugin().send_raw_email(
                            msg= 'Welcome to Forexology! Your verfication code is: {}'.format(code),
                            recipent= body['email'],
                            subject="Verify your Email"
                        )
                        return self.app.response_class(status= 200)
                    return self.app.response_class(status= 301)
                elif body['mode'] == 'CODE':
                    if body['code'] == session.get('VERIFICATION_CODE'):
                        return self.app.response_class(status= 200)
                    return self.app.response_class(status= 401)
                elif body['mode'] == 'COMPLETE':
                    res= self.helper.users.update_user(payload= {'password': body['password']})
                    print(res)
                    if res:
                        return self.app.response_class(status= 200)
                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)

    def assign_signup_index(self):
        @self.app.route(self.consts.signup_route, methods=["GET"])
        @self.app.route(self.consts.join_route, methods=["GET"])
        def signup_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            current_user_id= session.get("CURRENT_USER_ID", None)
            if current_user_id != None:
                return redirect(self.consts.profile_route)            
            return render_template(
                '/website/signup.html',
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

