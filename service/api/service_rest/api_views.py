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
def api_list_technicians(request, pk=None):
    if request.method == "GET":
        if pk:
            technician = Technician.objects.get(pk=pk)
            return JsonResponse(TechnicianListEncoder().default(technician))
        else:
            technicians = Technician.objects.all()
            return JsonResponse(
                TechnicianListEncoder().default(technicians), safe=False
            )
    else:
        content = json.loads(request.body)

        try:
            first_name = content["first_name"]
            last_name = content["last_name"]
            employee_id = content["employee_id"]
        except KeyError:
            return JsonResponse(
                {"error": "first_name, last_name, and employee_id are required"},
                status=400,
            )

        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)
