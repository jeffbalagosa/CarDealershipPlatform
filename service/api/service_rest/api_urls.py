from django.urls import path
from .api_views import (
    api_list_technicians,
    technician_detail,
    api_list_appointments,
    appointment_detail,
    appointment_cancel,
    appointment_finish,
    check_vin_in_inventory,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", technician_detail, name="technician_detail"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", appointment_detail, name="appointment_detail"),
    path(
        "appointments/<int:pk>/cancel/", appointment_cancel, name="appointment_cancel"
    ),
    path(
        "appointments/<int:pk>/finish/", appointment_finish, name="appointment_finish"
    ),
    # Used to verify VIP status
    path("check_vin/<str:vin>/", check_vin_in_inventory, name="check_vin_in_inventory"),
]
