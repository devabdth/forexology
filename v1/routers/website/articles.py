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


class ArticlesRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_all_articles_index()

    def assign_all_articles_index(self):
        @self.app.route(self.consts.all_articles_route, methods=["GET"])
        @self.app.route(self.consts.all_articles_read_route, methods=["GET"])
        @self.app.route(self.consts.all_articles_journal_route, methods=["GET"])
        def all_articles_index():
            lang = session.get('LANG', 'EN')
            mode = session.get('MODE', 'DARK')
            return render_template(
                '/website/all_articles.html',
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
