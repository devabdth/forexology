from os.path import dirname, abspath, join, exists
from datetime import datetime
from models.article import Article
from models.thread import Thread
from models.article_section import ArticleSection
import secrets
from plugins.consts import Consts

class ArticlesDatabaseHelper:
    def __init__(self):
        self.consts: Consts= Consts()
        self.trending_articles: list = [
            Article({
                "id": "sdfsdfcsdcsd{}".format(i),
                "title": {
                    "EN": "What happened in Gamasa pt {}".format(i),
                    "AR": "What happened in Gamasa pt {}".format(i),
                },
                "short_brief": {
                    "EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem.",
                    "AR": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem.",
                },
                "cover_attached_msg": {
                    "EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem.",
                    "AR": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem."
                },
                "parent_category": "135cc6cdcfe4bd527eb4f956",
                "category": "95a7cc16897a08b56ba4faf3",
                "sections": [
                    {
                    "title": {
                        "EN": "What happened in Gamasa pt {}".format(ii),
                        "AR": "What happened in Gamasa pt {}".format(ii),
                    },
                    "subtitle": {
                        "EN": f"What happened in Gamasa pt {i} Subtitle",
                        "AR": f"What happened in Gamasa pt {i} Subtitle"
                    },
                    "bio": {
                        "EN": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem.",
                        "AR": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl tortor, rhoncus eget nisi vel, iaculis laoreet quam. Mauris congue quam in dignissim pretium. Aliquam sit amet turpis sem. In dolor turpis, commodo in volutpat laoreet, venenatis lobortis lorem."
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["ssdfsdsdSDSDfsdfsd", "ssdfsdsdfsdfsd"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 1118,
                "mode": i % 2,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"sdfsdfcsdcsd{i}_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }) for i in range(9)
        ]

    def get_article_by_id(self, article_id):
        return self.trending_articles[0]

    def get_all_articles(self, filter_by: str = None, arrangment: str = 'ascending'):
        return self.trending_articles

    def multiple_articles_by_ids(self, ids: list):
        return self.trending_articles
    
    def get_article_by_writer_id(self, writer_id):
        return self.trending_articles

    def get_drafts_by_writer_id(self, writer_id):
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

    def delete_article(self, article_id):
        try:
            for article in self.trending_articles:
                if article.id == article_id:
                    del self.trending_articles[self.trending_articles.index(article)]
                    return True
            return False
        except Exception as e:
            print(e)
            return False

    def create_article(self, payload, media, publisher):
        try:
            sections= []
            images= []
            audios=[]
            videos=[]
            for section in payload['sections']:
                sec_id= str(secrets.token_hex(24))

                section_media= media[section['id']]
                section_media.filename= f'{sec_id}.{section_media.filename.split(".")[-1]}'

                if section_media.filename.split('.')[-1] in self.consts.covers_supported_extenstions:
                    images.append(section_media)

                if section_media.filename.split('.')[-1] in self.consts.audios_supported_extenstions:
                    audios.append(section_media)

                if section_media.filename.split('.')[-1] in self.consts.videos_supported_extenstions:
                    videos.append(section_media)

                section['id']= sec_id
                section['audio_stop']= float(section['audio_stop'])
                section['attached_ad_id']= ""
                sections.append(ArticleSection(section))
            
            payload['sections']= [section.to_dict() for section in sections]
            payload['attached_ad']= ""
            payload['id']= str(secrets.token_hex(12))
            payload["published_in"]= str(datetime.now())
            payload["published_by"]= [publisher]
            payload["saves"]= 0
            payload["mode"]= 1
            article= Article(payload)

            # TODO: Save Article
            self.trending_articles.append(article)
            if article != None:
                for image in images:
                    image.save(abspath(join(dirname(__file__), '../assets/articles/images/', image.filename),))
                for audio in audios:
                    audio.save(abspath(join(dirname(__file__), '../assets/articles/audios/', audio.filename),))
                for video in videos:
                    video.save(abspath(join(dirname(__file__), '../assets/articles/videos/', video.filename),))
                
                return True

            return False
        except Exception as e:
            print(e)
            return False

    def update_article(self, article_id: str, payload: dict, files: list= None):

        try:
            if 'id' in payload.keys():
                del payload['id']
            for article in self.trending_articles:
                if article.id == article_id:
                    for k in payload.keys():
                        if k == 'sections':
                            self.trending_articles[self.trending_articles.index(article)].__setattr__('sections', [ArticleSection(section) for section in payload['sections']])
                        self.trending_articles[self.trending_articles.index(article)].__setattr__(k, payload[k])
                        
                    return True
            return False
        except Exception as e:
            print(e)
            return False


    def get_section_cover(self, section_id):
        for ext in self.consts.covers_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/images/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_audio(self, section_id):
        for ext in self.consts.audios_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/audios/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_video(self, section_id):
        for ext in self.consts.videos_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/videos/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None
