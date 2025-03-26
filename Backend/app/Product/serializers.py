import os
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework import serializers
from .models import Product

class CustomProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()  # Chuyển thành URL khi response

    class Meta:
        model = Product
        fields = ['id', 'typeProduct', 'name', 'price', 'description', 'size', 'image']

    def get_image(self, obj):
     return obj.image if obj.image else []

    def create(self, validated_data):
        request = self.context.get('request')

        images_data = request.FILES.getlist('image')
        print("Data received:", images_data)

        image_paths = []
        if images_data:
            for image in images_data:
                path = default_storage.save(f'image/{image.name}', image)  
                print("Path:", path)
                image_paths.append(settings.MEDIA_URL + path)  

        validated_data.pop('image', None)

        product = Product.objects.create(**validated_data, image=image_paths)
        print("Product:", product)
        return product
