from django.conf import settings
from django.http import HttpResponse

def index(request):
    index_path = settings.BASE_DIR / 'static' / 'frontend' / 'index.html'
    with open(index_path, 'r', encoding='utf-8') as f:
        return HttpResponse(f.read(), content_type='text/html; charset=utf-8')
