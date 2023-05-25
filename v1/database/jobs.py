from os.path import abspath, join, dirname
from json import loads, dump
from models.job import Job
from models.job_application import JobApplication
from datetime import datetime
from sys import path
import secrets
path.insert(0, '../')


class JobsDatabaseHelper:
    def __init__(self):
        self.load_data()

    def load_data(self):
        self.all_jobs= []
        self.all_jobs_applications= []
        with open(abspath(join(dirname(__file__), '../jsons/jobs.json'))) as f:
            data= dict(loads(f.read()))
            self.all_jobs: list = [Job(payload) for payload in data.values()]

        with open(abspath(join(dirname(__file__), '../jsons/jobsApplications.json'))) as f:
            data= dict(loads(f.read()))
            self.all_jobs_applications: list = [JobApplication(payload) for payload in data.values()]

    def write_data(self):
        try:
            jobs_data= {job.id: job.to_dict() for job in self.all_jobs}
            applications_data= {job_app.id: job_app.to_dict() for job_app in self.all_jobs_applications}
            with open(abspath(join(dirname(__file__), '../jsons/jobs.json')), 'w') as f:
                dump(jobs_data, f)
            with open(abspath(join(dirname(__file__), '../jsons/jobsApplications.json')), 'w') as f:
                dump(applications_data, f)
            return True
        except Exception as e:
            print(e)
            return False

    def get_jobs_by_ids(self, jobs_ids):
        jobs= []
        print(jobs_ids)
        for job in self.all_jobs:
            if job.id in jobs_ids:
                jobs.append(job)
        return jobs
    
    def get_application_by_job_id(self, job_id):
        apps= []
        for job_app in self.all_jobs_applications:
            if job_app.job_id == job_id:
                apps.append(job_app)
        return apps
    
    def create_job(self, payload):
        try:
            job_id= str(secrets.token_hex(12))
            payload['id']= job_id
            payload['created_in']= str(datetime.now())

            job: Job= Job(payload)
            self.all_jobs.append(job)
            return self.write_data()
        except Exception as e:
            print(e)
            return False
    
    def update_job(self, payload):
        try:
            job: Job= Job(payload)
            for job_ in self.all_jobs:
                if job.id == job_.id:
                    self.all_jobs[self.all_jobs.index(job_)]= job
            return self.write_data()
        except Exception as e:
            print(e)
            return False
    
    def delete_job(self, job_id):
        try:
            for job in self.all_jobs:
                if job.id == job_id:
                    del self.all_jobs[self.all_jobs.index(job)]
            return self.write_data()
        except Exception as e:
            print(e)
            return False
