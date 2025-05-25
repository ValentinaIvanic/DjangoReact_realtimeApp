from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Question, Choice
from .serializers import QuestionSerializer

#list of questions, sorted: new first
#add question
class QuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by('-pub_date')
    serializer_class = QuestionSerializer

#get one chosen question
class QuestionDetailAPIView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

#vote
class VoteAPIView(APIView):
    def post(self, request, pk):
        question = get_object_or_404(Question, pk = pk)
        choice_id = request.data.get("choice_id")

        try:
            selected_choice = question.choices.get(pk = choice_id)
        except Choice.DoesNotExist:
            return Response(
                {"error": "Invalid choice ID."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        selected_choice.votes += 1
        selected_choice.save()

        return Response({"message": "Voting recorded successfully.", "choice_id": selected_choice.id, "votes": selected_choice.votes},
                        status=status.HTTP_200_OK)
    