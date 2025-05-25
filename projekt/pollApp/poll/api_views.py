from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Question, Choice
from .serializers import QuestionSerializer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

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
        question = get_object_or_404(Question, pk=pk)
        choice_id = request.data.get("choice_id")

        try:
            selected_choice = question.choices.get(pk=choice_id)
        except Choice.DoesNotExist:
            return Response(
                {"error": "Invalid choice ID."},
                status=status.HTTP_400_BAD_REQUEST
            )

        selected_choice.votes += 1
        selected_choice.save()

        #WebSocket
        serializer = QuestionSerializer(question)
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            f"question_{pk}",  # = consumers.py
            {
                "type": "send_vote_update",
                "data": serializer.data
            }
        )

        return Response({
            "message": "Voting recorded successfully.",
            "choice_id": selected_choice.id,
            "votes": selected_choice.votes
        }, status=status.HTTP_200_OK)
    