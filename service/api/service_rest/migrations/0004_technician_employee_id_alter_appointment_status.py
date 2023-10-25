# Generated by Django 4.0.3 on 2023-10-25 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_remove_technician_employee_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(default='0000', max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='created', max_length=50),
        ),
    ]