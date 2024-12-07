from django.db import models

class MBTIType(models.Model):
    name = models.CharField(max_length=4)  # e.g., INTJ, ENFP
    description = models.TextField()

class Career(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    mbti_type = models.ForeignKey(MBTIType, on_delete=models.CASCADE)
