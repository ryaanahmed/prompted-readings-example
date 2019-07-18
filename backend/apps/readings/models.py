from django.db import models


class Story(models.Model):
    text = models.TextField()

    
class Context(models.Model):
    text = models.TextField()
    story = models.ForeignKey(Story,
                              on_delete=models.CASCADE,
                              related_name='contexts')
    def __str__(self):
        return self.text

class Question(models.Model):
    wordLimit = models.IntegerField()
    text = models.TextField()
    story = models.ForeignKey(Story,
                              on_delete=models.CASCADE,
                              related_name='questions')

