import sys
sys.path.insert(0, '../')
        
from models.user import User
from models.article import Article
from models.category import Category, ParentCategory

from database.helper import DatabaseHelper

class FeedGenerator:
    def __init__(self):
        self.helper: DatabaseHelper= DatabaseHelper()

    def generate_user_feed(user: User):
        search_params= {}

        search_params["categories"]= user.prefered_categories
        search_params["classifications"]= user.prefered_parent_categories
        search_params["writers"]= user.prefered_writers

        articles= self.helper.articles.search_articles(search_params)
        return articles
