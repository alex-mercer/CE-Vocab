from django.db import models

# Create your models here.

class BookUnit(models.Model):
    name = models.CharField(max_length=100)
    page = models.SmallIntegerField()

    def __str__(self):
        return self.name

class Entry(models.Model):
    unit = models.ForeignKey(BookUnit)
    word = models.CharField(max_length=100)
    defintion_fa = models.TextField(blank=True)
    defintion_en = models.TextField(blank=True)
    example = models.TextField(blank=True)

    def __str__(self):
        return self.word
