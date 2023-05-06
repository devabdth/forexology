from os.path import abspath, join, dirname
from json import loads


class Consts:
    def __init__(self):
        self.covers_supported_extenstions: list = [
            'png', 'jpg', 'jpeg', 'gif', 'jfjf'
        ]
        self.podcast_supported_extenstions: list = ["mp3"]
        self.video_supported_extenstions: list = ["mp4"]

        with open(abspath(join(dirname(__file__), '../jsons/routers.json'))) as f:
            data = loads(f.read())
            # Admin Routes
            self.admin_publish_form_routes = data['ADMIN_PUBLISH_ROUTE']

            # Website Routes
            self.index_route = data['WEBSITE_INDEX_ROUTE']
            self.home_route = data['WEBSITE_HOME_ROUTE']
            self.main_page_route = data['WEBSITE_MAIN_PAGE_ROUTE']
            self.main_route = data['WEBSITE_MAIN_ROUTE']
            self.articles_route = data['WEBSITE_ARTICLES_ROUTE']
            self.courses_route = data['WEBSITE_COURSES_ROUTE']
            self.tools_route = data['WEBSITE_TOOLS_ROUTE']
            self.search_route = data['WEBSITE_SEARCH_ROUTE']
            self.login_route = data['WEBSITE_LOGIN_ROUTE']
            self.signup_route = data['WEBSITE_SIGNUP_ROUTE']
            self.join_route = data['WEBSITE_JOIN_ROUTE']
            self.articles_covers = data['WEBSITE_ASSETS_ARTICLES_COVERS_ROUTE']
            self.articles_podcast = data['WEBSITE_ARTICLE_PODCAST_ROUTE']
            self.categories_covers = data['WEBSITE_ASSETS_CATEGORIES_COVERS_ROUTE']
            self.categories_route = data['WEBSITE_CATEGORIES_ROUTE']
            self.writers_bg_free = data['WEBSITE_ASSETS_WRITERS_BGREE_ROUTE']
            self.writers_images = data['WEBSITE_ASSETS_WRITERS_ROUTE']
            self.article_route = data['WEBSITE_ARTICLE_ROUTE']
            self.read_route = data['WEBSITE_READ_ROUTE']
            self.journal_route = data['WEBSITE_JOURNAL_ROUTE']
            self.article_readtime_route = data['WEBSITE_READTIME_ROUTE']
            self.session_handler = data['WEBSITE_SESSION_HANDLER']
            self.all_articles_route = data['WEBSITE_ARTICLEs_ROUTE']
            self.all_articles_read_route = data['WEBSITE_ARTICLES_READ_ROUTE']
            self.all_articles_journal_route = data['WEBSITE_ARTICLES_JOURNAL_ROUTE']

            # Admin Routers
            self.admin_layout_route = data['ADMIN_LAYOUT_ROUTE']
