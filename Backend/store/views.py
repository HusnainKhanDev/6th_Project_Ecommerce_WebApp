from rest_framework.views import APIView
from .serializers import product_serializer, category_serializer, CartSerializer, CartItemSerializer, OrderSerializer
from rest_framework.response import Response
from decimal import Decimal
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
from .models import Product, Category, Cart, CartItem, Order, OrderItem
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
    
class get_cart(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # always returns a tuple of 2 values → (object, boolean)
        # cart    → the Cart object (either fetched or newly created)
        # created → True if a new cart was just created, False if an existing one was found
        cart, created = Cart.objects.get_or_create(user=request.user) # this is called tuple unpacking

        serializedData = CartSerializer(cart)
        return Response(serializedData.data, status=200)


class delete_from_cart(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, c_id, p_id):
        deleted_count, _ = CartItem.objects.get(cart_id=c_id, product_id=p_id).delete()

        if deleted_count > 0:
            return Response({"message": "Item removed"}, status=200)


class add_to_cart(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = request.data.get("item")

        try:
            serializer = CartItemSerializer(data=items)
            if serializer.is_valid():
                serializer.save(cart=cart) # we fetch cart separately and inject it manually during save
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        
        except IntegrityError:
            return Response({"error": "Item already in cart"}, status=400)  # handle duplicate 


class orders(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        cart = Cart.objects.get(user=request.user)
        items = CartItem.objects.filter(cart=cart)

        if not items:
            return Response({"error": "Cart is empty"}, status=400)
        
        total = 0
        for i in items:
           total += i.product.price * (1 - Decimal(i.product.discount / 100))
        
        order = Order.objects.create(
            user = request.user,
            total_price = total,
            shipping_address = request.data.get('shipping_address'),
            city = request.data.get('city'),
            postal_code = request.data.get('postal_code'),
            whatsapp_number = request.data.get('whatsapp_number')
        )

        for i in items:
            OrderItem.objects.create(
                order= order,
                product= i.product,
                quantity= i.quantity,
                color = i.color,
                price= i.product.price * Decimal(1 - (i.product.discount / 100))
            )

        items.delete()
        cart.delete()
    
        return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=201)
    
class direct_buy(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # get product details from request directly (no cart involved)
        product_id = request.data.get('product_id')
        color = request.data.get('color')
        quantity = request.data.get('quantity')

        product = Product.objects.get(id=product_id)

        price = product.price * Decimal(1 - (product.discount / 100))
        total = price * quantity

        order = Order.objects.create(
            user=request.user,
            total_price=total,
            shipping_address=request.data.get('shipping_address'),
            city=request.data.get('city'),
            postal_code=request.data.get('postal_code'),
            whatsapp_number=request.data.get('whatsapp_number')
        )

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            color=color,
            price=price
        )

        return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=201)

class get_orders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)

        if not orders.exists():
            return Response({"error": "No orders found"}, status=400)

        serialized_data = OrderSerializer(orders, many=True)

        return Response(serialized_data.data, status=200)