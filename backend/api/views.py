from django.contrib.auth.models import User
from rest_framework import viewsets

from .serializer import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class CsrfExemptSessionAuthentication(SessionAuthentication):
#
#     def enforce_csrf(self, request):
#         return
#
#
# class Object(APIView):
#     authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
#
#     def post(self, request, format=None):
#         return
