from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import UserModel
from .serializers import CustomUserSerializer

class UserView(APIView):
    def get(self, request):
        users = UserModel.objects.all()  
        serializer = CustomUserSerializer(users, many=True)  
        return Response(serializer.data)
   
