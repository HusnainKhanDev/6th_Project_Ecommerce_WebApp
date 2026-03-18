from rest_framework import serializers
from .models import Category, Product, ProductImage, CartItem, Cart, OrderItem, Order


class category_serializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'      


class product_serializer(serializers.ModelSerializer): 
    category = category_serializer(read_only=True) # this includes the foreign fields in queryset when we fetch products
    images = ProductImageSerializer(many=True, read_only=True) # also work in reverse relation 
    # since images have foreign field to products so products fetch related images via reverse relation 

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at']

class CartItemSerializer(serializers.ModelSerializer):

    product_detail = product_serializer(
        source="product", # do same work as normal one but useful when user give id and you have to return object based on that id
        read_only=True
    )
    # product_detail → name of the field in the JSON response.
    # source="product" → tells DRF: “look at the product field of the this model for this data.”
    # Nested serializer → converts that object into JSON automatically.
    # read_only=True → you cannot send this field in a request; it is only for output.

    class Meta:
        model = CartItem
        fields = '__all__'
        extra_kwargs = {
            'cart': {'read_only': True}  # 👈 cart is injected manually, not from request
        }


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product = product_serializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'