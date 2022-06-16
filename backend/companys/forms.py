from django import forms
from .models import Company_load_data


class Companyloadform(forms.ModelForm):
    class Meta:
        model = Company_load_data
        fields = "__all__"
