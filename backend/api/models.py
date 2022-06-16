from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    fullname = models.CharField(max_length=45)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
