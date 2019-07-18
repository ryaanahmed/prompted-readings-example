from django.contrib import admin
from .models import Story, Context, Question

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

class ContextInline(admin.TabularInline):
    model = Context
    extra = 2

class StoryAdmin(admin.ModelAdmin):
    model = Story
    inlines = [ ContextInline, QuestionInline, ]

admin.site.register(Story, StoryAdmin)
