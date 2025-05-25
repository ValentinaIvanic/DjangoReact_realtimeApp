import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ResultConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.question_id = self.scope['url_route']['kwargs']['question_id']
        self.room_group_name = f"results_{self.question_id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        pass  

    async def vote_update(self, event):
        await self.send(text_data=json.dumps({
            'message': 'vote_updated'
        }))