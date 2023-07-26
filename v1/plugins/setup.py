import sys
sys.path.insert(0, '../')
from analyze_lab.crm.articles_analysis import ArticlesAnalysis

from flask import Flask
from threading import Thread
from json import dump, dumps
from .config import Config
import datetime


class Setup:
    def __init__(self, app: Flask, socket):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.socket = socket
        self.threads= [
            Thread(target= lambda: app.run(port= self.cfg.port, debug=self.cfg.debug, use_reloader=False, host= self.cfg.host)),
        ]

    def initializiation(self):
        self.setup_files_and_directories()
        self.setup_app()
        # self.setup_routers()
        self.setup_errors_routers()
        # self.setup_crm_routers()
        self.setup_adminstration_webapp_routes()
        self.setup_publish_webapp_routes()
        self.setup_socket_handlers()
        self.assign_generate_threads()

        from routers.globals.demo import DemoRouter
        DemoRouter(self.app).setup()

    def assign_generate_threads(self):
        import time

        def articles_thread():
            while True:
                ArticlesAnalysis().report()
                time.sleep(60)

        self.threads.append(Thread(target= articles_thread))


    def setup_app(self):
        from flask_session import Session

        self.app.config["SESSION_PERMANENT"] = False
        self.app.config["SESSION_TYPE"] = "filesystem"
        self.app.config['SECRET'] = 'secret!1234'

        Session(self.app)

    def setup_files_and_directories(self):
        from os.path import abspath, dirname, join, exists
        from os import mkdir
        dirs= [
            "../assets/articles/",
            "../assets/articles/images",
            "../assets/articles/audios",
            "../assets/articles/videos",
            "../assets/users/",
            "../assets/users/images",
            "../assets/users/covers",
            "../assets/covers/courses",
            "../assets/promos/",
            "../assets/promos/courses",
        ]
        files= [
            {
                'dir': '../jsons/jobs.json',
                'initialData': {}
            },
            {
                'dir': '../jsons/courses.json',
                'initialData': {}
            },
            {
                'dir': '../jsons/jobsApplications.json',
                'initialData': {}
            },
            {
                'dir': '../jsons/writers.json',
                'initialData': {}
            },
            {
                'dir': '../jsons/writersInvitations.json',
                'initialData': {}
            },
            {
                'dir': '../jsons/articles_report.json',
                'initialData': {
                    f"{datetime.date.today().year}": {
                    "overall": {},
                    "months": {f"{i}": {
                        "TOTAL_READTIME":0,
                        "AVG_READTIME":0,
                        "TOTAL_VIEWS":0,
                        "AVG_VIEWS":0,
                        "TOTAL_SAVES":0,
                        "AVG_SAVES":0,
                        "TOTAL_COMMENTS":0,
                        "AVG_COMMENTS":0,
                        "TOTAL_RATINGS_APPROACHES":0,
                        "AVG_RATE":0,
                        "CATEGORIES": {},
                        "CLASSIFICATIONS": {}
                        } for i in range(1, 13)},
                    "weeks": {f"{i}": {
                        "TOTAL_READTIME":0,
                        "AVG_READTIME":0,
                        "TOTAL_VIEWS":0,
                        "AVG_VIEWS":0,
                        "TOTAL_SAVES":0,
                        "AVG_SAVES":0,
                        "TOTAL_COMMENTS":0,
                        "AVG_COMMENTS":0,
                        "TOTAL_RATINGS_APPROACHES":0,
                        "AVG_RATE":0,
                        "CATEGORIES": {},
                        "CLASSIFICATIONS": {}
                        } for i in range(1, 55)}
                    }
                }
            },
            {
                'dir': '../jsons/categories_report.json',
                'initialData': {
                    f"{datetime.date.today().year}": {
                    "overall": {
                        "CATEGORIES": {},
                        "CLASSIFICATIONS": {},
                    },
                    "months": {f"{i}": {
                        "CATEGORIES": {},
                        "CLASSIFICATIONS": {},
                        } for i in range(1, 13)},
                    "weeks": {f"{i}": {
                        "CATEGORIES": {},
                        "CLASSIFICATIONS": {},
                        } for i in range(1, 55)}
                    }
                }
            },
        ]

        for dir_ in dirs:
            path= abspath(join(dirname(__file__), dir_))
            if not exists(path):
                mkdir(path)
            


        for file_ in files:
            path= abspath(join(dirname(__file__), file_['dir']))
            if not exists(path):
                with open(path, 'w') as f:
                    if not path.split('.')[1] == 'json':
                        f.write(f'{file_["initialData"]}')
                    else:
                        json_object= dumps(file_['initialData'], indent= 4)
                        f.write(json_object)


    def setup_socket_handlers(self):
        # from socket_handlers.chatting import ChattingHandler
        # ChattingHandler(self.app, self.socket)
        pass


    def setup_errors_routers(self):
        from routers.globals.config import ConfigRouter
        ConfigRouter(self.app).setup()
        from routers.globals.errors import ErrorsRouter
        ErrorsRouter(self.app).setup()


    def setup_adminstration_webapp_routes(self):
        from routers.admin.publish import PublishAdminRouter
        PublishAdminRouter(self.app).setup()

        from routers.admin.layout import LayoutAdminRouter
        LayoutAdminRouter(self.app).setup()

        from routers.admin.admin import AdminRouter
        AdminRouter(self.app).setup()

        from routers.admin.home import HomeAdminRouter
        HomeAdminRouter(self.app).setup()

        from routers.admin.categories import CategoriesAdminRouter
        CategoriesAdminRouter(self.app).setup()

        from routers.admin.ads import AdsAdminRouter
        AdsAdminRouter(self.app).setup()

        from routers.admin.carrers import CareersAdminRouter
        CareersAdminRouter(self.app).setup()
        
        from routers.admin.admins import AdminsManagemnetAdminRouter
        AdminsManagemnetAdminRouter(self.app).setup()

        from routers.admin.writers import WritersAdminRouter
        WritersAdminRouter(self.app).setup()

    def setup_routers(self):

        from routers.website.careers import CareersRouter
        CareersRouter(self.app).setup()

        from routers.website.home import HomeRouter
        HomeRouter(self.app).setup()

        from routers.website.assets import AssetsRouter
        AssetsRouter(self.app).setup()

        from routers.website.article import ArticleRouter
        ArticleRouter(self.app).setup()

        from routers.website.auth import AuthRouter
        AuthRouter(self.app).setup()

        from routers.website.articles import ArticlesRouter
        ArticlesRouter(self.app).setup()

        from routers.website.categories import CategoriesRouter
        CategoriesRouter(self.app).setup()

        from routers.website.writer import WriterRouter
        WriterRouter(self.app).setup()

        from routers.website.agenda import AgendaRouter
        AgendaRouter(self.app).setup()

    def setup_publish_webapp_routes(self):
        from routers.publish.login import LoginPublishRouter
        LoginPublishRouter(self.app).setup()

        from routers.publish.home import HomePublishRouter
        HomePublishRouter(self.app).setup()

        from routers.publish.create import CreatePublishRouter
        CreatePublishRouter(self.app).setup()

        from routers.publish.articles import ArticlesPublishRouter
        ArticlesPublishRouter(self.app).setup()

        from routers.publish.profile import ProfilePublishRouter
        ProfilePublishRouter(self.app).setup()

    def setup_crm_routers(self):
        from routers.crm.articles import ArticlesCRMRouter
        ArticlesCRMRouter(self.app).setup()