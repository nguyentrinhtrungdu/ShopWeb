from django.db import models
from django.contrib.auth.hashers import make_password

class UserModel(models.Model):
    username = models.CharField(max_length=100,  unique=True, null=False)
    phone = models.CharField(max_length=100, unique=True, null=False)
    email = models.EmailField(max_length=100,unique=True, null=False)
    address = models.CharField(max_length=100)
    password = models.CharField(max_length=100, null=False)
    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username
    
def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
