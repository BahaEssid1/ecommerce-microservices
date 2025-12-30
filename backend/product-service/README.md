# Product Service (FastAPI)

This microservice is responsible for managing the product catalogue in the e-commerce application. It handles CRUD operations for products, category listing, inventory management, and product search. It uses **PostgreSQL** as the persistent database and is built with **FastAPI** (Python 3.11+).

Port: **8001**

## Responsibilities

- Product CRUD operations (Create, Read, Update, Delete) – Admin only for create/update/delete
- Category management
- Inventory tracking
- Price and discount handling
- Image metadata storage (URLs)
- Product search with filters
- Initial data seeding from [dummyjson.com](https://dummyjson.com/products)

## Database

- **PostgreSQL** (connected via service name `postgres` in Docker Compose)
- Table: `products`

## API Endpoints

| Method | Endpoint                  | Description                    | Access     |
| ------ | ------------------------- | ------------------------------ | ---------- |
| GET    | `/api/v1/products`        | List all products              | Public     |
| GET    | `/api/v1/products/{id}`   | Get product details by ID      | Public     |
| POST   | `/api/v1/products`        | Create a new product           | Admin only |
| PUT    | `/api/v1/products/{id}`   | Update an existing product     | Admin only |
| DELETE | `/api/v1/products/{id}`   | Delete a product               | Admin only |
| GET    | `/api/v1/categories`      | List all unique categories     | Public     |
| POST   | `/api/v1/products/search` | Search products (with filters) | Public     |

### Product Schema

```json
{
  "id": 1,
  "title": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "discountPercentage": 10.5,
  "rating": 4.5,
  "stock": 100,
  "brand": "Brand Name",
  "category": "Category",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}

Running Locally
Bashcd backend/product-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
API docs available at:
http://localhost:8001/docs (Swagger UI)
http://localhost:8001/redoc (ReDoc)
```
