from rest_framework import serializers
from .models import UserModel

class CustomUserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = UserModel
        fields = ['id','fullname', 'phone', 'email', 'address']  

