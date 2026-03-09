from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# UserManager handles HOW users are created (create_user, create_superuser)
# We need custom UserManager because we removed username — default Manager has username hardcoded and changing Model fields never affects Manager automatically
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email) #extra_fields catches phone full_name typ field
        user = self.model(email=email, **extra_fields) 
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)



# customized User model through AbstractUser
# but we have to done it before any migration firt do this 
class User(AbstractUser):
    username = None  # remove username field
    
    email = models.EmailField(unique=True)  # make email unique for login
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=12, blank=True)

    objects = UserManager() # for creating superuser

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