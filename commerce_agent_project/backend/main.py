from fastapi import FastAPI, HTTPException
import json
from typing import List, Dict

app = FastAPI()

# Load product data from products.json
try:
    with open("data/products.json", "r") as f:
        products: List[Dict] = json.load(f)  # Type annotation for clarity
except FileNotFoundError:
    products = []

@app.get("/")
async def read_root():
    return {"message": "Welcome to the e-commerce agent backend!"}

@app.get("/search/")
async def search_products(query: str):
    """
    Searches the product catalog for products that match the query.

    Args:
        query: The user's search query (e.g., "red dress").

    Returns:
        A list of products that match the query.  Each product is a dictionary.
        Returns an empty list if no products match.
    """
    results = []
    for product in products:
        if query.lower() in product["name"].lower() or query.lower() in product["description"].lower():
            results.append(product)
    return results
