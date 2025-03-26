
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    # Geet All Users
    path('', views.UserView.as_view()),
    # Get User By Id
    path('<int:user_id>', views.UserDetailView.as_view()),
    path('facebook/login/',views.LoginFacebook.as_view()),
    path('facebook/callback/',views.CallbackFb.as_view()),
]