from django.conf.urls.static import static


from django.conf.urls import include
from django.urls import path, re_path
from rest_framework import routers
from django.conf import settings
from api.views import UserViewSet
router = routers.DefaultRouter()
router.register("api/", UserViewSet, basename='userview')
urlpatterns = [
 re_path(r'^', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
