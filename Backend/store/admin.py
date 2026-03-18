from django.contrib import admin
from .models import Category, Product, Order, OrderItem, ProductImage, Cart, CartItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    search_fields = ('name',)


# @admin.register is for models you want to manage independently on their own admin page.
# TabularInline/StackedInline is for models you want to manage inside a parent model's page.
class ProductImageInline(admin.TabularInline): # another option: StackedInline 
# TabularInline is a Django admin class that displays related objects in a table format inside the parent model’s admin page.
# model = ProductImage Parent → Product Child → ProductImage TabularInline → show ProductImage rows as a small editable table inside Product admin.
    model = ProductImage 
    extra = 2  # When you open Product admin, you’ll see 1 empty image upload field ready.


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'category', 'created_At')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('price',)
    inlines = [ProductImageInline] # Attach child model editor to parent model screen


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_At')
    list_filter = ('created_At',)
    search_fields = ('user__username',)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price')
    list_filter = ('order',)


class CartItemsInline(admin.TabularInline):
    model =  CartItem
    extra = 0 


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    inlines = [CartItemsInline]
