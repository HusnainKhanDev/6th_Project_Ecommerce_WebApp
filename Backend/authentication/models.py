from django.db import models
from django.contrib.auth.models import AbstractUser

# customized User model through AbstractUser
# but we have to done it before any migration firt do this 
class User(AbstractUser):
    username = None  # remove username field
    
    email = models.EmailField(unique=True)  # make email unique for login
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=12, blank=True)

    # it does not set username as email
    USERNAME_FIELD = 'email'  # use email as login field instead of username
    REQUIRED_FIELDS = ['full_name']  # required when creating superuser via terminal

    def __str__(self):
        return self.email

# AbstractUser is Django's built-in User model exposed as a base class so you can extend it:
# What it already includes for free:
# username, email, password, first_name, last_name
# is_active, is_staff, is_superuser
# last_login, date_joined
# login/logout/authentication logic ✓