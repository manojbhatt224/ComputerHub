# Generated by Django 4.2.11 on 2024-04-10 11:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('computer', '0003_alter_computer_computer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='computer',
            name='computer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='computer_spec', to='computer.computerspecification'),
        ),
        migrations.AlterField(
            model_name='computerspecification',
            name='brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spec_brand', to='computer.computerbrands'),
        ),
    ]
