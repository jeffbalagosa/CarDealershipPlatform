from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment
from django.http import JsonResponse
import json


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianListEncoder)
    else:
        # Create a new technician
        content = json.loads(request.body)
        first_name = content["first_name"]
        last_name = content["last_name"]
        employee_id = content["employee_id"]
        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)
