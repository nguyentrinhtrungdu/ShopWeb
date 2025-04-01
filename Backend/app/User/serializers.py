from rest_framework import serializers
from .models import UserModel,AdminModel

class CustomUserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = UserModel
        fields = ['id','fullname', 'phone', 'email', 'address']  

class CustomAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminModel
        fields = ['id','username','password']
    