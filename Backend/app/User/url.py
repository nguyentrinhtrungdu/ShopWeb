from django.urls import path
from . import views
urlpatterns = [
    # Geet All Users
    path('', views.UserView.as_view()),
    # Get User By Id
    path('<int:user_id>', views.UserDetailView.as_view()),
    path('facebook/login/',views.LoginFacebook.as_view()),
    path('facebook/callback/',views.CallbackFb.as_view()),
    path('google/login/',views.LoginGG.as_view()),
    path('google/callback/',views.callbackGG.as_view()),
]