from django.contrib import admin
from .models import Category, Product, Order, OrderItem, ProductImage, Cart, CartItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')  # columns shown in list view
    search_fields = ('name',)              # enables search bar by name
    ordering = ('name',)                   # alphabetical order


# ProductImageInline → manage images inside Product page (no separate page needed)
# TabularInline → shows related objects as a compact table inside parent model page
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # shows 1 empty image upload field ready


# @admin.register → gives Product its own independent admin page
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'discount', 'get_stock', 'created_At')
    list_filter = ('category',)       # sidebar filter by category
    search_fields = ('name',)         # search bar by product name
    list_editable = ('price', 'discount')  # edit price and discount directly from list
    ordering = ('-created_At',)       # newest products first
    inlines = [ProductImageInline]    # attach ProductImage editor inside Product page

    # custom method to calculate total stock across all color variants
    # obj → current Product row, obj.images → all ProductImages via related_name='images'
    def get_stock(self, obj):
        total = sum(img.stock for img in obj.images.all())
        return f"{total} units"
    get_stock.short_description = 'Total Stock'  # column header name


# OrderItemInline → show OrderItems inside Order page instead of separate page
# StackedInline → displays each related object as a vertical form (spacious)
class OrderItemInline(admin.StackedInline):
    model = OrderItem
    extra = 0        # no empty rows
    # can_delete = False  # disable delete button
    max_num = 0      # disable add new button
    readonly_fields = ('product', 'color', 'quantity', 'price')  # all fields read only
    fields = ('product', 'color', 'quantity', 'price')           # control exactly what shows
    verbose_name = ""                        # hides individual item header
    verbose_name_plural = "Ordered Items"    # section title


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_full_name', 'get_email', 'city', 'total_price', 'status', 'created_At')
    list_filter = ('status', 'city', 'created_At')   # sidebar filters
    search_fields = ('user__full_name', 'user__email')  # search by user fields via __ (traverse relation)
    list_editable = ('status',)     # update order status directly from list without opening each order
    ordering = ('-created_At',)     # newest orders first
    readonly_fields = ('user', 'shipping_address', 'postal_code', 'whatsapp_number', 'total_price', 'city')
    inlines = [OrderItemInline]     # attach OrderItem editor inside Order page

    # obj → current Order row
    # obj.user → full User object via ORM (ForeignKey auto converts to object)
    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'  # column header name

    def get_full_name(self, obj):
        return obj.user.full_name
    get_full_name.short_description = 'Full Name'


# CartItemsInline → show CartItems inside Cart page
# TabularInline → compact table format
class CartItemsInline(admin.TabularInline):
    model = CartItem
    extra = 0
    can_delete = False
    max_num = 0
    readonly_fields = ('get_product', 'color', 'quantity')  # custom method must be in readonly_fields
    fields = ('get_product', 'color', 'quantity')           # only these fields show
    verbose_name = ""
    verbose_name_plural = "Cart Items"

    # custom method returns plain text instead of ForeignKey link
    # obj → current CartItem row
    def get_product(self, obj):
        return obj.product.name   # obj.product → full Product object via ORM
    get_product.short_description = 'Product'


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_full_name', 'get_email', 'get_item_count', 'created_at')
    readonly_fields = ('user',)     # user field read only
    ordering = ('-created_at',)     # newest carts first
    inlines = [CartItemsInline]     # attach CartItem editor inside Cart page
    actions = None                  # removes delete action from dropdown

    # completely disables delete button on detail page
    def has_delete_permission(self, request, obj=None):
        return False
    def has_add_permission(self, request):
        return False
    def has_change_permission(self, request, obj = ...):
        return False

    # obj → current Cart row
    # obj.user → full User object (ORM auto converts ForeignKey)
    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

    def get_full_name(self, obj):
        return obj.user.full_name
    get_full_name.short_description = 'Full Name'

    # obj.items → all CartItems for this cart via related_name='items'
    # same as CartItem.objects.filter(cart=obj)
    def get_item_count(self, obj):
        return f"{obj.items.count()} items"
    get_item_count.short_description = 'Cart Items'