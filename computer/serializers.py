from rest_framework import serializers
from .models import Computer, ComputerSpecification, ComputerBrands
import base64
# serializer to post the computer only data
class ComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = '__all__'

# serializer to load the specification key and value to drop down
class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComputerSpecification
        fields = '__all__'


# list of serialziers to fetch entire details of computer
class ComputerBrandsSerializer(serializers.ModelSerializer):
    logo_data = serializers.SerializerMethodField()
    class Meta:
        model = ComputerBrands
        fields = ['id', 'brand_name', 'logo_data']
    def get_logo_data(self, obj):
            if obj.logo:
                with open(obj.logo.path, 'rb') as image_file:
                    encoded_string = base64.b64encode(image_file.read())
                    return encoded_string.decode('utf-8')
            return None

class ComputerSpecificationSerializer(serializers.ModelSerializer):
    brand = ComputerBrandsSerializer()

    class Meta:
        model = ComputerSpecification
        fields = ['id', 'generation', 'price_min', 'price_max', 'ram', 'brand']

class ComputerListSerializer(serializers.ModelSerializer):
    computer= ComputerSpecificationSerializer()

    class Meta:
        model = Computer
        fields = ['id', 'computer_code', 'quantity', 'unit_rate', 'total_price', 'computer']

