from django.db import models
from api.models import User


class Company(models.Model):
    companyid = models.IntegerField(primary_key=True)
    cname = models.CharField(max_length=100)
    sitename = models.CharField(max_length=100)
    siteaddress = models.CharField(max_length=200)
    utillityname = models.CharField(max_length=45)
    category = models.CharField(max_length=45, blank=True)
    emailaddress = models.CharField(max_length=45)
    contact_name = models.CharField(max_length=45)
    phone_no = models.BigIntegerField(null=True)
    sitetype = models.CharField(max_length=45, blank=True)
    pvdesc = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.cname


class Company_load_data(models.Model):
    DataID = models.AutoField(primary_key=True)
    usage_point = models.CharField(max_length=45, blank=True)
    loaddata = models.FileField(upload_to='load-files', max_length=100)
    activated = models.BooleanField(default=False, editable=True)

    def __str__(self):
        return "File id: {}".format(self.DataID)


class Predicted_csv(models.Model):
    Data_and_time = models.DateTimeField()
    Usage = models.FloatField()
    Type = models.CharField(max_length=50)

    def __str__(self):
        return "File id: {}".format(self.id)


class Company_existing_pv_data(models.Model):
    PvID = models.AutoField(primary_key=True)
    existingpvsize = models.IntegerField()
    existingpvtype = models.CharField(max_length=45)
    solarGenerationdata = models.FileField(upload_to='Solar-generation', null=True, )
    systemSLD = models.FileField(upload_to='system-SLD', null=True, )
    companyid = models.ForeignKey(Company, related_name="existing_pv_data", on_delete=models.CASCADE)


class Company_existing_ev_data(models.Model):
    EvID = models.AutoField(primary_key=True)
    no_of_existingevs = models.CharField(max_length=50)
    no_of_existingevchargers = models.IntegerField()
    existingevdesc = models.CharField(max_length=500)
    annual_ev_miles = models.IntegerField()
    annual_fuel_expenditure = models.IntegerField()
    desired_ev_details = models.CharField(max_length=500)
    additionalInformation = models.CharField(max_length=500)
    no_of_req_evchargers = models.IntegerField()
    charger_type = models.CharField(max_length=50)
    EVcharge = models.CharField(max_length=50)
    companyid = models.ForeignKey(Company, related_name="existing_ev_data", on_delete=models.CASCADE)


class Company_new_ev_details(models.Model):
    NewEvID = models.AutoField(primary_key=True)
    no_of_req_evchargers = models.IntegerField()
    charger_type = models.CharField(max_length=50)
    EVcharge = models.CharField(max_length=50)
    visiting_vehicles = models.CharField(max_length=50)
    companyid = models.ForeignKey(Company, related_name="new_ev", on_delete=models.CASCADE)


class Company_resiliency_details(models.Model):
    resiliencyID = models.AutoField(primary_key=True)
    criticalload = models.CharField(max_length=50, blank=True)
    noofoutages = models.CharField(max_length=50, blank=True)
    outageduration = models.CharField(max_length=50, blank=True)
    outageType = models.CharField(max_length=50, blank=True)
    othertype = models.CharField(max_length=50, blank=True)
    powerfailureimpact = models.CharField(max_length=500, blank=True)
    companyid = models.ForeignKey(Company, related_name="resiliency_data", on_delete=models.CASCADE, default=0)
