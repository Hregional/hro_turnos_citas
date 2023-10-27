from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Area, CustomUser


class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Puesto', {'fields': ('area',)}),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'area')


admin.site.register(Area, AreaAdmin)
admin.site.register(CustomUser, CustomUserAdmin)