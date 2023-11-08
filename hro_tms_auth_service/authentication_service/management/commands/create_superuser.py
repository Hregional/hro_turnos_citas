from django.core.management.base import BaseCommand
from authentication_service.models import CustomUser, Area


class Command(BaseCommand):
   help = "Create a default superuser"

   def handle(self, *args, **kwargs):
       if not CustomUser.objects.filter(username='admin').exists():
           default_area = Area.objects.create(name="Medicina Interna")
           CustomUser.objects.create_superuser('admin', 'admin@dev.com', '123123', area=default_area)
           self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
       else:
           self.stdout.write(self.style.SUCCESS("Superuser already exists"))