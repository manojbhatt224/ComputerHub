from django.urls import path
from .views import CreateDisplayComputers, UpdateDeleteViewComputer, FetchSpecifications

urlpatterns = [
    path('specifications/', FetchSpecifications.as_view(), name="fetch_spec"),
    path('', CreateDisplayComputers.as_view(), name="view_all_create"),
    path('<int:pk>/', UpdateDeleteViewComputer.as_view(), name="update_delete_get")
]
