from django.urls import path
from .api_views import api_list_technicians, technician_detail

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", technician_detail, name="technician_detail"),
]
