from json import loads, load, dumps, dump
from os.path import exists, abspath, join, dirname
from pandas import DataFrame, read_sql


class Transformer:
    def __init__(self):
        pathes= [
            abspath(join(dirname(__file__), './forexology_db.sql')),
            abspath(join(dirname(__file__), './forexology_wp115.sql')),
            abspath(join(dirname(__file__), './forexology_wp571.sql')),
            abspath(join(dirname(__file__), './forexology_wp721.sql')),
        ]

        for path_ in pathes:
            with open(path_) as f:
                df= read_sql(f.read())
                print(df.head())


Transformer()