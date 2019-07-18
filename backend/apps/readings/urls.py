from django.urls import path

from . import views

urlpatterns = [
    path('story/<int:pk>', views.RandomStoryView.as_view()),
]

