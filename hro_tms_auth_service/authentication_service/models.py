from django.contrib.auth.models import AbstractUser
from django.db import models

class Area(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Clinic(models.Model):
    number = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    area = models.ForeignKey(Area, on_delete=models.PROTECT, related_name='area_clinics')

    def __str__(self):
        return f'{self.number} - {self.name or ""}'
    
    class Meta:
        verbose_name = "Clínica"
        verbose_name_plural = "Clínicas"
    

class CustomUser(AbstractUser):
    area = models.ForeignKey(Area, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f'{self.username} - {self.area}'