from pydantic import BaseModel
from typing import List, Optional


class ProductBase(BaseModel):
    title: str
    description: str
    price: float
    discountPercentage: Optional[float] = 0
    rating: Optional[float] = 0
    stock: int
    brand: str
    category: str
    thumbnail: Optional[str] = None
    images: List[str] = []


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True
