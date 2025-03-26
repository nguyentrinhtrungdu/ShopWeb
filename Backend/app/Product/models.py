from django.db import models

class Product(models.Model):
    typeProduct = models.CharField(max_length=100, null=False)
    name = models.CharField(max_length=100, unique=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    description = models.CharField(max_length=100)
    size = models.CharField(max_length=10)
    image = models.JSONField(default=list, blank=True)  # Store list of image paths as JSON
    
    class Meta:
        db_table = 'product'

    def __str__(self):
        return f"ID: {self.id} - Name: {self.name} - Type: {self.typeProduct} - Price: {self.price} - Size: {self.size} - Image: {self.image}"

