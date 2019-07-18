from django.shortcuts import render

from rest_framework import generics
from rest_framework import mixins
from rest_framework import response

from .models import Story
from .serializers import StorySerializer


class RandomStoryView(generics.RetrieveAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

