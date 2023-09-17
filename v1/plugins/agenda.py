import requests


class Agenda:
	def __init__(self):
		self.auth_key= "6506928310a838.27884125"
		self.exchange_codes= [
			"AAPL.US", "UN", ""
		]

	def get_data(self):

		response = requests.get(f"https://eodhd.com/api/calender/{self.exchange_codes[0]}?fmt=json&&api_token={self.auth_key}")
		if response.status_code == 200:
			print(response.json())
		else:
			print(f"Hello person, there's a {response.status_code} error with your request")



a= Agenda()
a.get_data()
