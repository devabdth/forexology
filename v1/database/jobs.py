from models.job import Job
from datetime import datetime
from sys import path
path.insert(0, '../')


class JobsDatabaseHelper:
    def __init__(self):
        self.all_jobs: list = [
            {
                "title": {"EN": "Senior Writer"},
                "subtitle": {"EN": "at least 2 years of experience"},
                "bio": {"EN": "We are searching for a senior writer with at least 2 years of experience"},
                "id": "dfsdfsdfsdfsdf{}".format(i),
                "created_in": str(datetime(2022, 1, 1)),
                "availlable_till": str(datetime(2024, 1, 1)),
                "requirements": {"EN": ["Wrote at least a thousand article!"]},
                "duties": {"EN": "Write a daily article"},
                "benefits": {"EN": "Have free coffee everyday"},
                "salaries_range": [
                    {"condition": {"EN": "Male"}, "rangePerUnit": 100}
                ],
                "salary_type": 0,
                "job_type": 1,
            }
            for i in range(10)
        ]
