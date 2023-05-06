from models.job_application import JobApplication
from datetime import datetime
from sys import path
path.insert(0, '../')


class JobApplicationDatabaseHelper:
    def __init__(self):
        self.all_jobs_applications: list = [
            {
                "job_id": "fsdfsdfsdfsdfsdf",
                "id": "sdfsdfsdfsdfsdfsdf{}".format(i),
                "name": "Ahmed Ali",
                "email": "ahmedali@cubersio.com",
                "second_email": "",
                "phone": "0123456789",
                "second_phone": "",
                "message": "My name is Ahmed ali, You know who am I?",
                "placed_in": str(datetime.now()),
            }
            for i in range(10)
        ]

    def get_applications_for_job_by_id(self, job_id):
        return self.all_jobs_applications
