from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Order
from django.core.mail import send_mail


@receiver(pre_save, sender=Order)
def send_email(sender, instance, **kwargs):
    print("function chala ha ")
    try:
        previous_obj = Order.objects.get(id=instance.id)

        if previous_obj.status != instance.status:
            subject = f"GigaGoods — Your Order #{instance.id} has been {instance.status.capitalize()}"
            
            message = f"""
                            Dear {instance.user.full_name},

                            Your order #{instance.id} status has been updated.

                            Order Status: {instance.status.upper()}
                            Delivery Address: {instance.shipping_address}, {instance.city}
                            Postal Code: {instance.postal_code}
                            WhatsApp: {instance.whatsapp_number}

                            {'Your order is being prepared and will be shipped soon.' if instance.status == 'confirmed' else ''}
                            {'Your order is on its way! You will receive it shortly.' if instance.status == 'shipped' else ''}
                            {'Your order has been delivered. Thank you for shopping with us!' if instance.status == 'delivered' else ''}
                            {'Your order has been cancelled. Please contact us for more information.' if instance.status == 'cancelled' else ''}

                            Thank you for choosing GigaGoods!
                            Best Regards,
                            GigaGoods Team
                                        """

            from_email = "hasnainkhan6106@gmail.com"
            recipient_email = instance.user.email  # ✅ instance.user not instance.cart.user

            send_mail(subject, message, from_email, [recipient_email])  # ✅ recipient must be a list
            print(f"Email sent to {instance.user.full_name} → {instance.status}")

    except Order.DoesNotExist:
        print("Kuch error ha")  # new order being created, skip