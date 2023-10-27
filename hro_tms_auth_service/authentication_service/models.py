from django.contrib.auth.models import AbstractUser
from django.db import models

class Area(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    

class CustomUser(AbstractUser):
    area = models.ForeignKey(Area, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f'{self.username} - {self.area}'