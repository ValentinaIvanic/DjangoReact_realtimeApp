from rest_framework import serializers
from .models import Question, Choice

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'question', 'choice_text', 'votes']
        extra_kwargs = {
            'question': {'read_only': True}
        }


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many = True)
    
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'pub_date', 'choices']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices')
        question = Question.objects.create(**validated_data)

        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)

        return question
