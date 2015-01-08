from django.http.response import HttpResponse
from django.shortcuts import render
import models

def index(request):
    return render(request, 'vocab/card.html', {'entries': models.Entry.objects.all()})


def about(request):
    return render(request, 'vocab/about.html')


def contribute(request):
    context = {}
    if request.method == 'GET':
        word_id = request.GET.get('id')
        word = models.Entry.objects.filter(pk=word_id)
        if len(word):
            word = word[0]
            context['entry'] = word
    elif request.method == 'POST':
        try:
            entry = models.SuggestedEntry()
            entry.contributor = request.POST.get('name')
            entry.word = request.POST.get('word')
            entry.unit = models.BookUnit.objects.get(pk=request.POST.get('unit'))
            entry.definition_fa = request.POST.get('persian_def')
            entry.definition_en = request.POST.get('english_def')
            entry.example = request.POST.get('examples')
            entry.save()
            context['message'] = 'Your word has been submitted, thanks for your contribution.'
        except:
            context['message'] = 'There was a problem submitting your word, please try again'

    return render(request, 'vocab/word.html', context)

