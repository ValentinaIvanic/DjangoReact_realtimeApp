from django.contrib import admin
from .models import *

admin.site.site_header = "Polls"
admin.site.site_title = "Admin"
admin.site.index_title = "Bok"

class ChoiceInLine(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [(None, {'fields': ['question_text']}), ('Date Info', {'fields': ['pub_date'], 'classes': ['collapse']}),]
    inlines = [ChoiceInLine]


admin.site.register(Question, QuestionAdmin)