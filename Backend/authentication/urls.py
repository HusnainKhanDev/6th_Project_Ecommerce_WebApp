from django.urls import path
from .views import signup, signin, logout, get_user
urlpatterns = [
    path('signup/', signup.as_view()),
    path('signin/', signin.as_view()),
    path('logout/', logout.as_view()),
    path('get/user/', get_user.as_view())
]