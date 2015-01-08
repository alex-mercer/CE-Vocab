from django.contrib import admin
import models

class EntryAdmin(admin.ModelAdmin):
    list_display = ('word','unit','definition_fa','definition_en')
    list_editable = ('definition_fa','definition_en')
    list_filter=('unit',)

admin.site.register(models.BookUnit)
admin.site.register(models.Entry,EntryAdmin)
admin.site.register(models.SuggestedEntry,EntryAdmin)
