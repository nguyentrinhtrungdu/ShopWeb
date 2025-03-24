from django.db import models

class UserModel(models.Model):
    username = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username
