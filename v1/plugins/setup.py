from flask import Flask
from .config import Config


class Setup:
    def __init__(self, app: Flask, socket):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.socket = socket

    def initializiation(self):
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

    def setup_socket_handlers(self):
        # from socket_handlers.chatting import ChattingHandler
        # ChattingHandler(self.app, self.socket)
        pass

    def setup_adminstration_webapp_routes(self):
        from routers.admin.publish import PublishAdminRouter
        PublishAdminRouter(self.app).setup()
        from routers.admin.layout import LayoutAdminRouter
        LayoutAdminRouter(self.app).setup()

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
