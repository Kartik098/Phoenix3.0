from .models import Company, Company_load_data, Company_existing_pv_data, Company_existing_ev_data, \
    Company_new_ev_details, Company_resiliency_details
from rest_framework import serializers


class CompanyLoadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_load_data
        fields = "__all__"


class CompanyExistingPVSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_existing_pv_data
        fields = ['PvID', 'existingpvsize', 'existingpvtype', 'systemSLD', 'solarGenerationdata']


class CompanyExistingEVSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_existing_ev_data
        fields = "__all__"


class CompanyNewEVSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_new_ev_details
        fields = "__all__"


class CompanyResiliencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company_resiliency_details
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    data = CompanyLoadSerializer(read_only=True, many=True)
    existing_pv_data = CompanyExistingPVSerializer(read_only=True, many=True)
    existing_ev_data = CompanyExistingEVSerializer(read_only=True, many=True)
    new_ev = CompanyNewEVSerializer(read_only=True, many=True)
    resiliency_data = CompanyResiliencySerializer(read_only=True, many=True)

    class Meta:
        model = Company
        fields = "__all__"
