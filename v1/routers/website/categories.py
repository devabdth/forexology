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


class CategoriesRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_all_categories_index()
        self.assign_single_categories_index()
        self.assign_single_classification_index()

    def assign_all_categories_index(self):
        @self.app.route(self.consts.categories_route, methods=["GET"])
        def all_categories_index():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            return render_template(
                '/website/all_categories.html',
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


    def assign_single_categories_index(self):
        @self.app.route(self.consts.single_category_route, methods=["GET"])
        def single_category_index(category_id):
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            return render_template(
                '/website/category.html',
                category= self.helper.categories.get_category_by_id(category_id),
                articles= self.helper.articles.get_articles_by_category(category_id),
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

    def assign_single_classification_index(self):
        @self.app.route(self.consts.single_classification_route, methods=["GET"])
        def single_classification_index(classification_id):
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            return render_template(
                '/website/classification.html',
                classification= self.helper.categories.get_parent_category_by_id(classification_id),
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
