from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import CustomProductSerializer
from .models import Product

class ProductView(APIView):

    def get(self, request):
        try:
            products = Product.objects.all()
            serializer = CustomProductSerializer(products, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = CustomProductSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailView(APIView):
    def get(self,request,product_id):
        try:
            product = Product.objects.get(id=product_id)
            if (product == None):
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = CustomProductSerializer(product)
            return Response({"product":serializer.data})
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def put(self,request,product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = CustomProductSerializer(product, data=request.data, context={'request': request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def delete(self,request,product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({"status": "Delete Product Successfully"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)