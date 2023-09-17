from json import loads, load, dumps, dump
from os.path import exists, abspath, join, dirname
from pandas import DataFrame, read_sql
import sqlite3



class Transformer:
    def __init__(self):
        pathes= [
            abspath(join(dirname(__file__), './forexology_db.sql.gz')),
            abspath(join(dirname(__file__), './forexology_wp115.sql.gz')),
            abspath(join(dirname(__file__), './forexology_wp571.sql.gz')),
            abspath(join(dirname(__file__), './forexology_wp721.sql.gz')),
        ]

        for path_ in pathes:
            with open(path_) as f:
                conn = sqlite3.connect(path_)
                df= read_sql("SELECT * FROM blogs", conn, compression='gzip')
                print(df.head())


Transformer()