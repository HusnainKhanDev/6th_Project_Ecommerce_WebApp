from django.urls import path
from .views import get_products, get_category, get_cart, add_to_cart, orders, get_orders, delete_from_cart

urlpatterns = [
    path('products/', get_products.as_view()),
    path('categories/', get_category.as_view()),
    path('cart/', get_cart.as_view()),
    path('add/cart/', add_to_cart.as_view()),
    path('order/', orders.as_view()),
    path('get/order/', get_orders.as_view()),
    path('cart/delete/item/<int:c_id>/<int:p_id>', delete_from_cart.as_view()),

]   