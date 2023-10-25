from django.shortcuts import render
from .models import Customer,Salesperson,Sale,AutomobileVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
import requests

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id","id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number","id"]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin","import_href",]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["price","customer","salesperson","automobile","id"]
    encoders = {
        "customer": CustomerEncoder(),
        "salesperson": SalespersonEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_salesperson(request):

    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonEncoder
        )

    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def salesperson_detail(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def list_customer(request):

    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )

    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def customer_detail(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def list_sales(request):

    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )

    else:

        content = json.loads(request.body)
        customer_id = content["customer"]
        salesperson_id = content["salesperson"]
        vin = content["automobile"]


        try:
            customer = Customer.objects.get(id=customer_id)
            salesperson = Salesperson.objects.get(id=salesperson_id)
            automobile = AutomobileVO.objects.get(vin=vin)

            content["customer"] = customer
            content["salesperson"] = salesperson
            content["automobile"] = automobile

        except (
                Customer.DoesNotExist,
                Salesperson.DoesNotExist,
                AutomobileVO.DoesNotExist):
            return JsonResponse(
                {"message": "Invalid customer ID, salesperson ID, or automobile VIN"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def sales_detail(request, pk):
    if request.method == "GET":
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
