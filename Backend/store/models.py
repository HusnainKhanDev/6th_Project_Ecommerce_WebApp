from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()  # automatically gets whatever AUTH_USER_MODEL is set to

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    discount = models.PositiveIntegerField(default=0)  
    created_At = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    color = models.CharField(max_length=50, blank=True, null=True )
    stock = models.PositiveIntegerField(default=0, blank=True, null=True )

    def __str__(self):
        return f"Image for {self.product.name}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending',     'Pending'),
        ('confirmed',   'Confirmed'),
        ('shipped',     'Shipped'),
        ('delivered',   'Delivered'),
        ('cancelled',   'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', blank=True)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    created_At = models.DateTimeField(auto_now_add=True)

    shipping_address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    whatsapp_number =  models.CharField(max_length=11)

    def __str__(self):
        return f"Order ID: {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)
    color = models.CharField(max_length=50) 
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=1)

    class Meta: # work like a composite primary key
        unique_together = ('cart', 'product', 'color')
        # same product with same color cannot be added twice in same cart ✓
        # but same product with different color is allowed ✓

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"
    