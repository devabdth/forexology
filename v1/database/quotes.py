import secrets
from os.path import abspath, dirname, join
from json import load, loads, dump, dumps
import random


class QuotesDatabaseHelper:
	def __init__(self):
		self.load_data()


	def load_data(self):
		try:
			with open(abspath(join(dirname(__file__), '../jsons/quotes.json')), 'r') as f:
				data= loads(f.read())
				self.all_quotes= data['quotes']
		except Exception as e:
			print(e)
			self.all_quotes= []


	def write_data(self, new_entry= None):
		try:
			if not new_entry is None:
				self.all_quotes.append(new_entry)

			with open(abspath(join(dirname(__file__), '../jsons/quotes.json')), 'w') as f:
				dump({'quotes': self.all_quotes}, f)
				f.close()
			self.load_data()
			return True
		except Exception as e:
			print(e)
			return False


	def get_quote(self):
		try:
			length= len(self.all_quotes)
			quote= self.all_quotes[random.randint(0, (length -1))]
			return quote
		except Exception as e:
			print(e)
			return None

	def create_quote(self, payload):
		try:
			payload['id']= str(secrets.token_hex(12))
			result= self.write_data(new_entry= payload)
			return result
		except Exception as e:
			print(e)
			return False

	def delete_quote(self, quote_id):
		try:
			for quote in self.all_quotes:
				if quote['id'] == quote_id:
					del self.all_quotes[self.all_quotes.index(quote)]
					result= self.write_data()
					return result
			return False
		except Exception as e:
			print(e)
			return False
