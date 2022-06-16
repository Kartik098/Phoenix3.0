from django.contrib import admin
from api.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_filter = (
        'id', 'fullname', 'username', 'password')
    list_display = (
        'id', 'fullname', 'username', 'password')
