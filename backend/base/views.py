from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from . products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . models import *
from . serializers import *

@api_view(['GET'])
def gerRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        
        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        'api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',

    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i 
    #         break
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)