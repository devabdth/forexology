from database.helper import DatabaseHelper
from analyze_lab.feed.feed_generator import FeedGenerator
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for, redirect
from json import dumps
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class HomeRouter:
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
        self.assign_home_index()

    def assign_home_index(self):
        @self.app.route(self.consts.index_route, methods=["GET"])
        @self.app.route(self.consts.home_route, methods=["GET"])
        @self.app.route(self.consts.main_page_route, methods=["GET"])
        @self.app.route(self.consts.main_route, methods=["GET"])
        def home_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            if current_user_id is None:
                return redirect(self.consts.profile_route)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
            return render_template(
                '/website/profile.html',
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
