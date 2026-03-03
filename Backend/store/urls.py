from django.urls import path
from .views import get_products, get_category

urlpatterns = [
    path('products/', get_products.as_view()),
    path('categories/', get_category.as_view()),
    
]