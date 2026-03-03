from rest_framework.views import APIView
from .serializers import product_serializer, category_serializer
from rest_framework.response import Response
from .models import Product, Category

class get_products(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializedData = product_serializer(products, many=True)
        return Response(serializedData.data)

class get_category(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializedData = category_serializer(categories, many=True)
        return Response(serializedData.data) 