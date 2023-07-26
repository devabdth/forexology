# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from bs4 import BeautifulSoup
# import pandas as pd

# class AgendaScraper:
#     def __init__(self):
#         self.ar_url= 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=8&lang=3'
#         self.en_url= 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=8&lang=1'
        
#         op = webdriver.ChromeOptions()
#         op.add_argument('headless')

#         self.en_driver = webdriver.Chrome(options=op)
#         self.ar_driver = webdriver.Chrome(options=op)

#     def en_scraper(self):
#         self.en_driver.get(self.en_url)
#         wait = WebDriverWait(self.en_driver, 1000)
#         data_range = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.title')))
#         soup= BeautifulSoup(self.en_driver.page_source, features="lxml")
#         rows= soup.find_all('tr', attrs={'class': 'displayNone'})
#         data= []

#         for row in rows:
#             container= row.find('td')
#             container= container.find('div', attrs={'class': 'displayNone'})
#             print(f'displayNone: {container}')
#             container= container.find('div', attrs={'class': 'title'})
#             print(f'infoBox: {container}')
#             # entry= {}
#             # entry["title"]= row.find('div', attrs= {'title'}).text
#             # entry["actual"]= row.find('div', attrs= {'actual'}).find('span', attrs={"class": "dirLtr"}).text
#             # entry["forecast"]= row.find('div', attrs= {'forecast'}).find('span', attrs={"class": "dirLtr"}).text
#             # entry["previous"]= row.find('div', attrs= {'previous'}).find('span', attrs={"class": "dirLtr"}).text
#             # data.append(entry)
#             # return
#             # print(data[0])

#     def ar_scraper(self):
#         self.ar_driver.get(self.ar_url)
#         soup= BeautifulSoup(self.ar_driver.page_source, features="lxml")
#         rows= soup.find_all('tr', attrs={'class': 'displayNone'})
#         data= []
#         print(data[0])

#     def scrape(self):
#         from threading import Thread

#         en_thread= Thread(target= self.en_scraper)
#         ar_thread= Thread(target= self.ar_scraper)

#         en_thread.start()
#         # ar_thread.start()

#         en_thread.join()
#         # ar_thread.join()


import json

class AgendaScraper:
    
    def __init__(self):
        import tradingeconomics as te
        te.login()
        te.subscribe('calendar')
        te.run(self.on_message)

    def on_message(self, ws, message):
        print(json.loads(message))




agenda= AgendaScraper()
    