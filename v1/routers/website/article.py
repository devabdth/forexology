from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, request


from json import dumps, loads

from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class ArticleRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_article_index()
        self.assign_article_readtime()

    def assign_article_readtime(self):
        @self.app.route(self.consts.article_readtime_route, methods=["PATCH"])
        def article_readtime():
            body = dict(loads(request.data))
            res= self.helper.articles.update_readtime(
                article_id=body['articleId'],
                duration=body['duration'],
                section_id=body['sectionId']
            )
            if res: 
                return self.app.response_class(status= 200)
            
            return self.app.response_class(status= 500)

    def assign_article_index(self):
        @self.app.route(self.consts.article_route, methods=["GET"])
        @self.app.route(self.consts.read_route, methods=["GET"])
        @self.app.route(self.consts.journal_route, methods=["GET"])
        def article_index(article_id):
            lang = session.get('LANG', 'EN')
            mode = session.get('MODE', 'DARK')
            article = self.helper.articles.get_article_by_id(article_id)
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            return render_template(
                '/website/article.html',
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                db_helper=self.helper,
                utils=self.utils,
                layout=self.layout,
                article=article,
                json_parser=dumps
            )
