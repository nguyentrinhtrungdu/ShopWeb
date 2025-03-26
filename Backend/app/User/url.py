
from django.urls import path
from . import views
urlpatterns = [
    # Geet All Users
    path('', views.UserView.as_view()),
    # Get User By Id
    path('<int:user_id>', views.UserDetailView.as_view()),
]