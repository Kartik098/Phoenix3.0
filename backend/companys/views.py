from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from .forms import Companyloadform
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
from .utils import Interpolate_fun
from companys.models import Company, Company_load_data, Company_existing_pv_data, Company_existing_ev_data, \
    Company_new_ev_details, Company_resiliency_details, Predicted_csv
from companys.serializers import CompanySerializer, CompanyLoadSerializer, CompanyExistingPVSerializer, \
    CompanyExistingEVSerializer, CompanyNewEVSerializer, CompanyResiliencySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


@csrf_protect
class CompanyView(APIView):
    # @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        qs = Company.objects.all()
        serializer = CompanySerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class CompanyLoadViewSet(viewsets.ModelViewSet):
    queryset = Company_load_data.objects.all()
    serializer_class = CompanyLoadSerializer

#
# class CompanyLoadView(APIView):
#
#     def get(self, request, *args, **kwargs):
#         qs = Company_load_data.objects.all()
#         serializer = CompanyLoadSerializer(qs, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, *args, **kwargs):
#         file = request.data.get("file", None)
#         import pdb;
#         pdb.set_trace()
#         print(file)
#         if file:
#             return Response({"message": "File is received"}, status=200)
#         else:
#             return Response({"message": "File is missing"}, status=400)


def upload_file_view(request):
    error_message = None
    success_message = None
    data = None
    print(request)
    form = Companyloadform(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        form = Companyloadform

        obj = Company_load_data.objects.get(activated=False)
        print(obj)
        with open(obj.loaddata.path, 'r') as f:
            df = pd.read_csv(f)

        # Prediction of intervals
        intervals = Interpolate_fun(df)
        df = intervals.reset_index()
        print(df)
        for i in range(0, len(df)):
            date_and_time = df.iloc[i]['Interval']
            usage = df.iloc[i]['Usage']
            Type = df.iloc[i]['Type']
            Predicted_csv.objects.create(
                Data_and_time=date_and_time,
                Usage=usage,
                Type=Type
            )

        obj.activated = True
        obj.save()
    success_message = "Uploaded successfully."

    return HttpResponse(success_message)


class CompanyExistingPVViewSet(viewsets.ModelViewSet):
    queryset = Company_existing_pv_data.objects.all()
    serializer_class = CompanyExistingPVSerializer


class CompanyExistingPVView(APIView):

    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        qs = Company_existing_pv_data.objects.all()
        serializer = CompanyExistingPVSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanyExistingPVSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class CompanyExistingEVViewSet(viewsets.ModelViewSet):
    queryset = Company_existing_ev_data.objects.all()
    serializer_class = CompanyExistingEVSerializer


class CompanyExistingEVView(APIView):

    def get(self, request, *args, **kwargs):
        qs = Company_existing_ev_data.objects.all()
        serializer = CompanyExistingEVSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanyExistingEVSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class CompanyNewEVViewSet(viewsets.ModelViewSet):
    queryset = Company_new_ev_details.objects.all()
    serializer_class = CompanyNewEVSerializer


class CompanyNewEVView(APIView):

    def get(self, request, *args, **kwargs):
        qs = Company_new_ev_details.objects.all()
        serializer = CompanyNewEVSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanyNewEVSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class CompanyResiliencyViewSet(viewsets.ModelViewSet):
    queryset = Company_resiliency_details.objects.all()
    serializer_class = CompanyResiliencySerializer


class CompanyResiliencyView(APIView):

    def get(self, request, *args, **kwargs):
        qs = Company_resiliency_details.objects.all()
        serializer = CompanyResiliencySerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanyResiliencySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


def csrf(request):
    return HttpResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


def simple(request):
    print("Hello")
    return HttpResponse("Hello world")
