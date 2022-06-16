from django.contrib import admin

from companys.models import Company, Company_load_data, Company_existing_pv_data, Company_existing_ev_data, \
    Company_new_ev_details, Company_resiliency_details


# Register your models here.


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_filter = (
         'cname', 'sitename', 'siteaddress', 'utillityname', 'category', 'emailaddress', 'contact_name')
    list_display = (
         'cname', 'sitename', 'siteaddress', 'utillityname', 'category', 'emailaddress', 'contact_name')


@admin.register(Company_load_data)
class CompanyLoadAdmin(admin.ModelAdmin):
    list_filter = (
         'DataID', 'usage_point', 'loaddata', 'activated')
    list_display = (
        'DataID', 'usage_point', 'loaddata', 'activated')


@admin.register(Company_existing_pv_data)
class CompanyExistingPVAdmin(admin.ModelAdmin):
    list_filter = (
         'existingpvsize', 'existingpvtype', 'systemSLD', 'solarGenerationdata')
    list_display = (
         'existingpvsize', 'existingpvtype', 'systemSLD', 'solarGenerationdata')


@admin.register(Company_existing_ev_data)
class CompanyExistingEVAdmin(admin.ModelAdmin):
    list_filter = (
        'no_of_existingevs', 'no_of_existingevchargers', 'existingevdesc', 'annual_ev_miles',
        'annual_fuel_expenditure', 'desired_ev_details', 'additionalInformation',
        'no_of_req_evchargers', 'charger_type', 'EVcharge')
    list_display = (
        'no_of_existingevs', 'no_of_existingevchargers', 'existingevdesc', 'annual_ev_miles',
        'annual_fuel_expenditure', 'desired_ev_details', 'additionalInformation',
        'no_of_req_evchargers', 'charger_type', 'EVcharge')


@admin.register(Company_new_ev_details)
class CompanyNewEVAdmin(admin.ModelAdmin):
    list_filter = (
        'NewEvID', 'no_of_req_evchargers', 'charger_type', 'EVcharge', 'visiting_vehicles')
    list_display = (
        'NewEvID', 'no_of_req_evchargers', 'charger_type', 'EVcharge', 'visiting_vehicles')


@admin.register(Company_resiliency_details)
class CompanyResiliencyAdmin(admin.ModelAdmin):
    list_filter = (
        'criticalload', 'noofoutages', 'outageduration',
        'outageType', 'othertype', 'powerfailureimpact')
    list_display = (
        'criticalload', 'noofoutages', 'outageduration',
        'outageType', 'othertype', 'powerfailureimpact')
