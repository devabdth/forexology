from .categories import CategoriesDatabaseHelper
from .articles import ArticlesDatabaseHelper
from .ads import AdsDatabaseHelper
from .writers import WritersDatabaseHelper
from .jobs import JobsDatabaseHelper
from .jobs_applications import JobApplicationDatabaseHelper


class DatabaseHelper:
    def __init__(self):
        self.categories = CategoriesDatabaseHelper()
        self.articles = ArticlesDatabaseHelper()
        self.ads = AdsDatabaseHelper()
        self.writers = WritersDatabaseHelper()
        self.jobs = JobsDatabaseHelper()
        self.jobs_applications = JobApplicationDatabaseHelper()
