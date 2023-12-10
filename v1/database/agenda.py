from os.path import dirname, abspath, join
from json import loads, dumps, dump
import secrets
class AgendaDatabaseHelper:
    def __init__(self):
        self.path= abspath(join(dirname(__file__), '../jsons/agenda.json'))
        self.load_data()


    def load_data(self):
        try:
            with open(self.path, 'r') as f:
                self.agenda_snippets= dict(loads(f.read()))
                f.close()
        except Exception as e:
            print(e)
            self.agenda_snippets= {}

    def write_data(self, new_snippet: dict= None):
        if not new_snippet is None:
            self.agenda_snippets[new_snippet['id']]= new_snippet

        try:
            with open(self.path, 'w') as f:
                dump(self.agenda_snippets, f)
                f.close()
                return True
        except Exception as e:
            print(e)
            return False


    def create_snippet(self, event: dict, timestamp: str, comment: dict, country_code: str, power: int, forecast: float, actual: float, previous: float):
        try:
            snippet_id= str(secrets.token_hex(12))
            snippet= {
                'id': snippet_id,
                'event': event,
                'timestamp': timestamp,
                'comment': comment,
                'country_code': country_code,
                'power': power,
                'actual': actual,
                'forecast': forecast,
                'previous': previous,
            }

            return self.write_data(new_snippet= snippet)
        except Exception as e:
            print(e)
            return False

    def delete_snippet(self, snippet_id):
        try:
            del self.agenda_snippets[snippet_id]
            return self.write_data()
        except Exception as e:
            print(e)
            return False

    def update_snippet(self, snippet):
        try:
            self.agenda_snippets[snippet['id']]= snippet
            return self.write_data()

        except Exception as e:
            print(e)
            return False