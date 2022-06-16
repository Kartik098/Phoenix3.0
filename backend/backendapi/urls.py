from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from django.views.static import serve
from rest_framework import routers
from companys import views


from companys.views import CompanyViewSet, CompanyExistingPVViewSet, \
    CompanyExistingPVView, CompanyExistingEVViewSet, CompanyExistingEVView, CompanyNewEVView, CompanyNewEVViewSet, \
    CompanyResiliencyView, CompanyResiliencyViewSet, upload_file_view, CompanyLoadViewSet

route = routers.DefaultRouter()
route.register("CompanyModal", CompanyViewSet, basename='companyview')
route.register("CompanyLoad", CompanyLoadViewSet, basename='LoadView')
route.register("ExistingPV", CompanyExistingPVViewSet, basename="PVView")
route.register("ExistingEV", CompanyExistingEVViewSet, basename="EVView")
route.register("NewEV", CompanyNewEVViewSet, basename="NewEVView")
route.register("Resiliency_Details", CompanyResiliencyViewSet, basename="ResiliencyView")

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', include(route.urls)),
                  re_path('api/', include('api.urls')),
                  path('process_data/', upload_file_view, name="Upload_load"),
                  path('company/', include(route.urls)),
                  path('company/csrf/', views.csrf),
                  path('company/simple/', views.simple),
                  path('ping/', views.ping),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += [
        re_path(r'media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT
        })
    ]
