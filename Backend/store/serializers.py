from rest_framework import serializers
from .models import Category, Product


class category_serializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class product_serializer(serializers.ModelSerializer):
    category = category_serializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at']