from rest_framework.views import APIView
from .serializers import product_serializer, category_serializer, CartSerializer, CartItemSerializer
from rest_framework.response import Response
from .models import Product, Category, Cart
# Django ORM automatically converts ForeignKey into full related object 
# DB stores raw integer (user_id = 3) but ORM converts it to full object when accessed via dot notation
# QUERYING: use _id for performance → Cart.objects.get(user_id=3) skips extra DB lookup
# ACCESSING: only after fetching into variable → cart.user.username, cart.user.email ✓

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
    
class GetCart(APIView):
    def get(self, request):
        # always returns a tuple of 2 values → (object, boolean)
        # cart    → the Cart object (either fetched or newly created)
        # created → True if a new cart was just created, False if an existing one was found
        cart, created = Cart.objects.get_or_create(user=request.user) # this is called tuplr unpacking 
        serializedData = CartSerializer(cart)
        return Response(serializedData.data, status=200)
    

class add_to_cart(APIView):
    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        items = request.data.get("items", [])

        serializer = CartItemSerializer(data=items, many=True) # many=True means it have to iterate over array

        if serializer.is_valid():
            serializer.save(cart=cart) # we fetch cart separately and inject it manually during save
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
