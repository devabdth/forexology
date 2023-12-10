from .categories import CategoriesDatabaseHelper
from .articles import ArticlesDatabaseHelper
from .ads import AdsDatabaseHelper
from .writers import WritersDatabaseHelper
from .jobs import JobsDatabaseHelper
from .jobs_applications import JobApplicationDatabaseHelper
from .admins import AdminsDatabaseHelper
from .users import UsersDatabaseHelper
from .courses import CoursesDatabaseHelper
from .quotes import QuotesDatabaseHelper
from .agenda import AgendaDatabaseHelper
import pymongo

from sys import path
path.insert(0, '../')
from plugins.config import Config

class DatabaseHelper:
    def __init__(self):
        self.client = pymongo.MongoClient(Config().db_url)
        self.categories = CategoriesDatabaseHelper()
        self.articles = ArticlesDatabaseHelper(self.client)
        self.ads = AdsDatabaseHelper()
        self.writers = WritersDatabaseHelper()
        self.jobs = JobsDatabaseHelper()
        self.jobs_applications = JobApplicationDatabaseHelper()
        self.admins= AdminsDatabaseHelper()
        self.users= UsersDatabaseHelper(self.client)
        self.courses= CoursesDatabaseHelper()
        self.quotes= QuotesDatabaseHelper()
        self.agenda= AgendaDatabaseHelper()
