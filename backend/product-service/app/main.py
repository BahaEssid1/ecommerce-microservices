from typing import Optional
from fastapi import FastAPI, HTTPException
from typing import List, Optional
from app.schemas import ProductCreate, ProductUpdate, ProductResponse

app = FastAPI(title="Product Service")

# Fake in-memory database
products_db = []
categories_db = ["phones", "chargers", "headphones"]


@app.get("/api/v1/products", response_model=List[ProductResponse])
def list_products():
    return products_db


@app.get("/api/v1/products/search", response_model=List[ProductResponse])
def search_products(query: Optional[str] = None):
    if not query:
        return products_db

    return [
        product for product in products_db
        if query.lower() in product["title"].lower()
    ]


@app.get("/api/v1/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    for product in products_db:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")


@app.post("/api/v1/products", response_model=ProductResponse)
def create_product(product: ProductCreate):
    new_product = product.dict()
    new_product["id"] = len(products_db) + 1
    products_db.append(new_product)
    return new_product


@app.put("/api/v1/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product: ProductUpdate):
    for index, existing_product in enumerate(products_db):
        if existing_product["id"] == product_id:
            updated_product = product.dict()
            updated_product["id"] = product_id
            products_db[index] = updated_product
            return updated_product
    raise HTTPException(status_code=404, detail="Product not found")


@app.delete("/api/v1/products/{product_id}")
def delete_product(product_id: int):
    for index, product in enumerate(products_db):
        if product["id"] == product_id:
            products_db.pop(index)
            return {"message": "Product deleted"}
    raise HTTPException(status_code=404, detail="Product not found")


@app.get("/api/v1/categories")
def list_categories():
    return categories_db


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "product-service"}
