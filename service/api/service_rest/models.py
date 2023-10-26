from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=20, unique=True)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20, unique=True, default="0000")

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50, default="created")
    vin = models.CharField(max_length=20)
    customer = models.CharField(max_length=100, null=True)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)

    def get_api_url(self):
        return reverse("api_list_appointments", kwargs={"pk": self.pk})

    def __str__(self):
        return (
            f"{self.date_time} {self.reason} {self.status} {self.vin} {self.technician}"
        )
