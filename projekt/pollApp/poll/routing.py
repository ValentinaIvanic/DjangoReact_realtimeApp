from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/results/(?P<question_id>\d+)/$', consumers.ResultConsumer.as_asgi()),
]
