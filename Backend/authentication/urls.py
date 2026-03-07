from django.urls import path
from .views import signup, signin, logout
urlpatterns = [
    path('signup/', signup.as_view()),
    path('signin/', signin.as_view()),
    path('logout/', logout.as_view())
]