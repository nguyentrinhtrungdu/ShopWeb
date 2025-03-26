from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import UserModel
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect 
import requests

Fb_APP_ID ="1016913946996512"
Fb_APP_SECERT = "d9d9d9f70b6f73cec99c1995f75e77a5"
FB_REDIRECT_URI = "http://localhost:8000/User/facebook/callback"

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

class LoginFacebook(APIView):
    def get(self, request, *args, **kwargs):
        auth_url = f"https://www.facebook.com/v18.0/dialog/oauth?client_id={Fb_APP_ID}&redirect_uri={FB_REDIRECT_URI}&scope=email,public_profile"
        return redirect(auth_url)

class CallbackFb(APIView):
    serializer_class = CustomUserSerializer
    def get(self, request,*args, **kwargs):
        code = request.GET.get('code')
        print(code)
        if code:
            response = requests.get(
                f"https://graph.facebook.com/v18.0/oauth/access_token?client_id={Fb_APP_ID}&redirect_uri={FB_REDIRECT_URI}&client_secret={Fb_APP_SECERT}&code={code}"
            )
            data = response.json()
            if "access_token" in data:
                request.session['access_token'] = data['access_token']

                user_response = requests.get(
                    f"https://graph.facebook.com/me?fields=id,name,email&access_token={data['access_token']}",
                ) 
                user_data = user_response.json()
                
                email = user_data.get("email")
                fullname = user_data.get("name")
                print(fullname,email)
                kt = UserModel.objects.filter(email=email).first()
                if kt :
                    user_data = self.serializer_class(kt).data
                    print('user_data',user_data)
                    refresh = RefreshToken.for_user(kt)
                    access_token = str(refresh.access_token)
                    return Response({'message': 'Đăng nhap User thành công', 'data': user_data,'access_token':access_token}, status=status.HTTP_200_OK)
                mydata = self.serializer_class(data={"fullname": fullname, "email": email})
                print("data",mydata)
                if mydata.is_valid():
                    user=mydata.save()
                    print(user)
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    return Response({'message': 'Đăng ký User thành công', 'data': mydata.data,'token':access_token}, status=status.HTTP_201_CREATED)
                
        return Response({'error': 'Đăng nhập thất bại'}, status=status.HTTP_400_BAD_REQUEST)
