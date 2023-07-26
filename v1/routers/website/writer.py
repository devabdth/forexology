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


class WriterRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_writer_index()

    def assign_writer_index(self):
        @self.app.route(self.consts.writer_route, methods=["GET"])
        def writer_index(writer_id):
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            articles = self.helper.articles.get_article_by_writer_id(writer_id)
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
  
            return render_template(
                '/website/writer.html',
                content=self.content,
                user_data= user_data,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                db_helper=self.helper,
                utils=self.utils,
                layout=self.layout,
                articles=articles,
                writer= self.helper.writers.get_writer_by_id(writer_id),
                json_parser=dumps
            )
