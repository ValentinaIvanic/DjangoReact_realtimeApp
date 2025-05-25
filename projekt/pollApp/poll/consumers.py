import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ResultsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.question_id = self.scope['url_route']['kwargs']['question_id']
        self.room_group_name = f'question_{self.question_id}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def send_vote_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))

