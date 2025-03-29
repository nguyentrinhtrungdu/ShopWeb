from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import make_password,check_password
class UserModel(models.Model):
    fullname = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255,unique=True, null=False)
    address = models.CharField(max_length=255,null=True)
    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.fullname  

class AdminModel(models.Model):
    username = models.CharField(max_length=255,unique=True,null=False)
    password = models.CharField(max_length=255,null=False)
    class Meta:
        db_table = 'admin'
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if not self.pk or AdminModel.objects.filter(pk=self.pk, password=self.password).exists() is False:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
