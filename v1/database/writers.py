from models.writer import Writer

from datetime import datetime


class WritersDatabaseHelper:
    def __init__(self):
        self.all_writers: list = [
            Writer({
                "id": "dfsdfsdfsdf{}".format(i),
                "name": {"EN": "Writer {}".format(i)},
                "bio": {"EN": "I'm setting my pen free"},
                "joined_in": str(datetime.now()),
                "tags": [],
                "prefered_category": [],
                "prefered_parent_category": [],
                "social_media_links": {
                    "FACEBOOK": "https://www.facebook.com",
                    "TWITTER": "https://www.twitter.com",
                    "TIKTOK": "https://www.tiktok.com",
                    "LINKEDIN": "https://www.linkedin.com",
				}
            })
            for i in range(0, 10)
        ]

    def get_writer_by_id(self, writer_id: str):
        return self.all_writers[0]

    def get_writers_by_ids(self, writers: list):
        if len(writers) == 0:
            return [self.get_writer_by_id]

        return self.all_writers[: len(writers)]

    def get_writers_by_id(self, writers_ids: list):
        return self.all_writers[:len(writers_ids)]
