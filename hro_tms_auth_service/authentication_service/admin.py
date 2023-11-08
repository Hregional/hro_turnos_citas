from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Area, CustomUser, Clinic

class ClinicInline(admin.TabularInline):
    model = Clinic
    extra = 1


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Puesto', {'fields': ('area',)}),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'area')


class UserInline(admin.TabularInline):
    model = CustomUser
    extra = 1


class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    inlines = [ClinicInline, UserInline]


admin.site.register(Area, AreaAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Clinic)