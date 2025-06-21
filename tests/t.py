import requests
from bs4 import BeautifulSoup
import re

def scrape_all_links(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises HTTPError for bad requests (4XX, 5XX)
        soup = BeautifulSoup(response.text, 'html.parser')
        links = [a['href'] for a in soup.find_all('a', href=True)]
        absolute_links = []
        for link in links:
            if link.startswith('/'):
                absolute_links.append(url + link)
            elif link.startswith('http'):
                absolute_links.append(link)
        # Remove duplicate links
        unique_links = list(set(absolute_links))
        return unique_links
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return []

# URL to scrape
url = "https://developer.salesforce.com/"
all_links = scrape_all_links(url)

# Output the links
for link in all_links:
    print(link)
