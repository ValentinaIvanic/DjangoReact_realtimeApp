from django.urls import path
from . import api_views

urlpatterns = [
    path('questions/', api_views.QuestionListCreateAPIView.as_view(), name='question_list'),
    path('question/<int:pk>/', api_views.QuestionDetailAPIView.as_view(), name='question_detail'),
    path('questions/<int:pk>/vote/', api_views.VoteAPIView.as_view(), name='question-vote'),

]