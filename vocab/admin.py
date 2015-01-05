from django.contrib import admin
import models

class EntryAdmin(admin.ModelAdmin):
    list_display = ('word','unit')

admin.site.register(models.BookUnit)
admin.site.register(models.Entry,EntryAdmin)
