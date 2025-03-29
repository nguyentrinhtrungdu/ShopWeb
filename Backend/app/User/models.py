from django.db import models
from django.contrib.auth.hashers import make_password

class UserModel(models.Model):
    fullname = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255,unique=True, null=False)
    address = models.CharField(max_length=255,null=True)
    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.fullname  
