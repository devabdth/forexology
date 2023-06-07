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
        self.setup_publish_webapp_routes()
        self.setup_socket_handlers()

    

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
        ]
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

        for dir_ in dirs:
            path= abspath(join(dirname(__file__), dir_))
            if not exists(path):
                mkdir(path)
            


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

        from routers.website.auth import AuthRouter
        AuthRouter(self.app).setup()

        from routers.website.articles import ArticlesRouter
        ArticlesRouter(self.app).setup()

        from routers.website.categories import CategoriesRouter
        CategoriesRouter(self.app).setup()

        from routers.website.writer import WriterRouter
        WriterRouter(self.app).setup()

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
