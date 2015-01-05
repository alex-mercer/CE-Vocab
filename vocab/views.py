from django.http.response import HttpResponse
from django.shortcuts import render
import models

def index(request):
    return render(request,'vocab/index.html',{'entries':models.Entry.objects.all()})
