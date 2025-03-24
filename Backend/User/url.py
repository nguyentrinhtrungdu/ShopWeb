
from django.urls import path
from . import views
urlpatterns = [
    path('getAllUsers', views.UserView.as_view()),
]
