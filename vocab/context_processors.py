import models

def units(request):
    return {'units':models.BookUnit.objects.all()}
