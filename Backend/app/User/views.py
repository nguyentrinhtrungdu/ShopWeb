from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import UserModel
from .serializers import CustomUserSerializer

class UserView(APIView):
    def get(self, request):
        try:
            users = UserModel.objects.all()  
            serializer = CustomUserSerializer(users, many=True) 
            return Response({"data":serializer.data}, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def post(self, request):
        try:
            serializer = CustomUserSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except UserModel.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserDetailView(APIView):
    def get(self,request,user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            if (user == None):
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = CustomUserSerializer(user)
            return Response({"user":serializer.data})
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def put(self,request,user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            serializer = CustomUserSerializer(user, data=request.data,  partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def delete(self,request,user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            user.delete()
            return Response({"status": "Delete User Successfully"}, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            return Response({"error": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)
   