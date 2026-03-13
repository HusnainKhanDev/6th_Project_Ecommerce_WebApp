from django.urls import path
from .views import get_products, get_category, GetCart, add_to_cart

urlpatterns = [
    path('products/', get_products.as_view()),
    path('categories/', get_category.as_view()),
    path('cart/', GetCart.as_view()),
    path('add/cart/', add_to_cart.as_view()),

    
]