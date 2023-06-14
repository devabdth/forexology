from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for
from json import dumps
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class CareersRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_careers_index()

    def assign_careers_index(self):
        @self.app.route(self.consts.careers_route, methods=["GET"])
        @self.app.route(self.consts.jobs_route, methods=["GET"])
        def careers_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.helper.jobs.load_data()
            self.layout.load()
            return render_template(
                '/website/careers.html',
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
