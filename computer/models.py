from django.db import models

class ComputerBrands(models.Model):
    id=models.AutoField(primary_key=True)
    brand_name=models.CharField(max_length=100)
    logo=models.ImageField(upload_to='assets/logos/')

    def __str__(self):
        return self.brand_name

class ComputerSpecification(models.Model):
    id=models.AutoField(primary_key=True)
    generation=models.CharField(max_length=100)
    price_min=models.DecimalField(max_digits=10, decimal_places=2)
    price_max=models.DecimalField(max_digits=10, decimal_places=2)
    ram=models.IntegerField()
    brand=models.ForeignKey(ComputerBrands, on_delete=models.CASCADE, related_name='spec_brand')

    def __str__(self):
        return self.generation
    
class Computer(models.Model):
    id=models.AutoField(primary_key=True)
    computer_code = models.CharField(max_length=100, unique=True)
    computer = models.ForeignKey(ComputerSpecification, on_delete=models.CASCADE, related_name='computer_spec')
    quantity = models.IntegerField()
    unit_rate = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_rate
        super().save(*args, **kwargs)

    def __str__(self):
        return self.computer_code