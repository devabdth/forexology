from os import mkdir
from os.path import join, dirname, abspath, exists
from plugins.consts import Consts
from plugins.config import Config
from flask import Flask, send_file, redirect, request

from sys import path
path.insert(0, '../')


class AssetsRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.consts: Consts = Consts()

    def setup(self):
        self.assign_articles_covers()
        self.assign_categories_covers()
        self.assign_writers_bg_free()
        self.assign_writers_images()
        self.assign_articles_podcast()

    def assign_articles_covers(self):
        @self.app.route(self.consts.articles_covers, methods=["GET"])
        def articles_covers(article_id):
            covers_path: str= abspath(join(dirname(__file__), '../../assets/covers/articles/'))
            if not exists(covers_path):
                mkdir(covers_path)
                return self.app.response_class(status=404)


            for ext in self.consts.covers_supported_extenstions:
                cover_path= join(covers_path, '{}.{}'.format(article_id, ext))
                if exists(cover_path):
                    return send_file(cover_path, mimetype='image/{}'.format(ext))

            return self.app.response_class(status=404)

    def assign_articles_podcast(self):
        @self.app.route(self.consts.articles_podcast, methods=["GET"])
        def articles_podcast(article_id):
            covers_path: str= abspath(join(dirname(__file__), '../../assets/audios/articles/'))
            if not exists(covers_path):
                mkdir(covers_path)
                return self.app.response_class(status=404)


            for ext in self.consts.podcast_supported_extenstions:
                cover_path= join(covers_path, '{}.{}'.format(article_id, ext))
                if exists(cover_path):
                    return send_file(cover_path, mimetype='image/{}'.format(ext))

            return self.app.response_class(status=404)


    def assign_categories_covers(self):
        @self.app.route(self.consts.categories_covers, methods=["GET"])
        def categories_covers(category_id):
            covers_path: str= abspath(join(dirname(__file__), '../../assets/covers/categories/'))
            if not exists(covers_path):
                mkdir(covers_path)
                return self.app.response_class(status=404)

            for ext in self.consts.covers_supported_extenstions:
                cover_path= join(covers_path, '{}.{}'.format(category_id, ext))
                if exists(cover_path):
                    return send_file(cover_path, mimetype='image/{}'.format(ext))

            return self.app.response_class(status=404)



    def assign_writers_bg_free(self):
        @self.app.route(self.consts.writers_bg_free, methods=["GET"])
        def writers_bg_free(writer_id):
            covers_path: str= abspath(join(dirname(__file__), '../../assets/writers/bgFree/'))
            if not exists(covers_path):
                mkdir(covers_path)
                return self.app.response_class(status=404)

            for ext in self.consts.covers_supported_extenstions:
                cover_path= join(covers_path, '{}.{}'.format(writer_id, ext))
                if exists(cover_path):
                    return send_file(cover_path, mimetype='image/{}'.format(ext))

            return self.app.response_class(status=404)



    def assign_writers_images(self):
        @self.app.route(self.consts.writers_images, methods=["GET"])
        def writers_images(writer_id):
            covers_path: str= abspath(join(dirname(__file__), '../../assets/writers/images/'))
            if not exists(covers_path):
                mkdir(covers_path)
                return self.app.response_class(status=404)

            for ext in self.consts.covers_supported_extenstions:
                cover_path= join(covers_path, '{}.{}'.format(writer_id, ext))
                if exists(cover_path):
                    return send_file(cover_path, mimetype='image/{}'.format(ext))

            return self.app.response_class(status=404)

