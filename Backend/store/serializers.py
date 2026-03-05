from rest_framework import serializers
from .models import Category, Product, ProductImage, CartItem, Cart


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
    product = product_serializer(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
