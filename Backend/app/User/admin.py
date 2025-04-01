from django.contrib import admin
from .models import UserModel,AdminModel

admin.site.register(UserModel)   
admin.site.register(AdminModel)