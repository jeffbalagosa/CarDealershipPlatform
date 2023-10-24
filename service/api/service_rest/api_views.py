from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment
from django.http import JsonResponse
import json


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "sold"]

    def get_extra_data(self, obj):
        return {"import_href": obj.import_href}


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name"]

    def get_extra_data(self, obj):
        return {"employee_id": obj.id}


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date_time", "reason", "status", "vin", "customer"]

    def get_extra_data(self, obj):
        return {"technician": obj.technician.id}


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianListEncoder)
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)


@require_http_methods(["GET", "DELETE", "PUT"])
def technician_detail(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(pk=pk)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(pk=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(pk=pk)
            technician.first_name = content["first_name"]
            technician.last_name = content["last_name"]
            return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist."}, status=404)

        Technician.objects.filter(pk=pk).update(**content)
        technician = Technician.objects.get(pk=pk)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments}, encoder=AppointmentListEncoder, safe=False
        )
    else:
        content = json.loads(request.body)
        technician_id = content["technician"]
        try:
            technician = Technician.objects.get(pk=technician_id)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist."}, status=404)

        content["technician"] = technician
        appointment = Appointment.objects.create(**content)
        appointment.status = "created"
        appointment.save()
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def appointment_detail(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(pk=pk)
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)
    else:
        count, _ = Appointment.objects.filter(pk=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def appointment_cancel(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        appointment.status = "cancelled"
        appointment.save()
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist."}, status=404)


@require_http_methods(["PUT"])
def appointment_finish(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist."}, status=404)
