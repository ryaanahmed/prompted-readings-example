from rest_framework import serializers
from .models import Story, Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            'text',
            'wordLimit',
        )


class StorySerializer(serializers.ModelSerializer):
    contexts = serializers.StringRelatedField(many=True, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = (
            'id',
            'text',
            'contexts',
            'questions',
        )

