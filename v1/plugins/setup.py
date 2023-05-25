from flask import Flask
from .config import Config


class Setup:
    def __init__(self, app: Flask, socket):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.socket = socket

    def initializiation(self):
        self.setup_files_and_directories()
        self.setup_app()
        self.setup_routers()
        self.setup_adminstration_webapp_routes()
        self.setup_socket_handlers()

    def setup_app(self):
        from flask_session import Session

        self.app.config["SESSION_PERMANENT"] = False
        self.app.config["SESSION_TYPE"] = "filesystem"
        self.app.config['SECRET'] = 'secret!1234'

        Session(self.app)

    def setup_files_and_directories(self):
        from os.path import abspath, dirname, join, exists

        files= [
            {
                'dir': '../jsons/jobs.json',
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
        ]

        for file_ in files:
            path= abspath(join(dirname(__file__), file_['dir']))
            if not exists(path):
                with open(path, 'w') as f:
                    f.write(f'{file_["initialData"]}')


    def setup_socket_handlers(self):
        # from socket_handlers.chatting import ChattingHandler
        # ChattingHandler(self.app, self.socket)
        pass

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

        from routers.admin.carrers import CarrersAdminRouter
        CarrersAdminRouter(self.app).setup()
        
        from routers.admin.admins import AdminsManagemnetAdminRouter
        AdminsManagemnetAdminRouter(self.app).setup()

        from routers.admin.writers import WritersAdminRouter
        WritersAdminRouter(self.app).setup()

    def setup_routers(self):

        from routers.website.config import ConfigRouter
        ConfigRouter(self.app).setup()

        from routers.website.home import HomeRouter
        HomeRouter(self.app).setup()

        from routers.website.assets import AssetsRouter
        AssetsRouter(self.app).setup()

        from routers.website.article import ArticleRouter
        ArticleRouter(self.app).setup()

        from routers.website.login import LoginRouter
        LoginRouter(self.app).setup()

        from routers.website.signup import SignupRouter
        SignupRouter(self.app).setup()

        from routers.website.articles import ArticlesRouter
        ArticlesRouter(self.app).setup()

        from routers.website.categories import CategoriesRouter
        CategoriesRouter(self.app).setup()

        from routers.website.writer import WriterRouter
        WriterRouter(self.app).setup()
