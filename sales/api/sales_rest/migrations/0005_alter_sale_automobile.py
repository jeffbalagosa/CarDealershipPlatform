# Generated by Django 4.0.3 on 2023-10-24 21:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_salesperson_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='automobile', to='sales_rest.automobilevo'),
        ),
    ]
