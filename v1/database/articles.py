from datetime import datetime
from models.article import Article
from models.thread import Thread


class ArticlesDatabaseHelper:
    def __init__(self):
        self.trending_articles: list = [
            Article({
                "id": "sdfsdfcsdcsd{}".format(i),
                "title": {"EN": "What happened in Gamasa pt {}".format(i)},
                "short_brief": {"EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem."},
                "cover_attached_msg": {"EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem."},
                "parent_category": "cvsdfsdfsdfsdfssdsxxf2",
                "category": "cvsdfsdfsdfsdfsdf2",
                "sections": [
                    {
                    "title": {"EN": "What happened in Gamasa pt {}".format(ii)},
                    "subtitle": {"EN": f"What happened in Gamasa pt {i} Subtitle"},
                    "bio": {"EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem."},
                    "id": f"sdfsdfcsdcsd{i}_ARTICLE_SECTION_{ii}",
                    "attachement_msg": {"EN": "This is an Image"},
                    "attachment_type": "image",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "HOME_SCREEN_AD",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["ssdfsdsdSDSDfsdfsd", "ssdfsdsdfsdfsd"],
                "attached_ad": "HOME_SCREEN_AD",
                "saves": 124,
                "mode": i % 2,
                "tags": [],
                "record_available": False,

            }) for i in range(9)
        ]

    def get_article_by_id(self, article_id):
        return self.trending_articles[0]

    def get_all_articles(self, filter_by: str = None, arrangment: str = 'ascending'):
        return self.trending_articles

    def multiple_articles_by_ads(self, ids: list):
        return self.trending_articles
    
    def get_article_by_writer_id(self, writer_id):
        return self.trending_articles

    def get_articles_by_category_and_parent_category(self, category, parent_category):
        return self.trending_articles

    def get_articles_by_category(self, category_id):
        return {
            "trending": self.get_all_articles(),
            "featured": self.get_all_articles(),
            "all_articles": self.get_all_articles(),
            "mostRecent": self.get_all_articles(),
        }
        
    def update_readtime(self, section_id, article_id, duration):
        return True
