from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active WebSocket connections
connections = {}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    connections[user_id] = websocket
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            if "JJ" in data:
                bot_response = "Abbe kiska naam ledia bhai"
            else:
                bot_response = f"{data}" 

            # Send response back to the same user
            await websocket.send_text(bot_response)
    except WebSocketDisconnect:
        del connections[user_id]
        print(f"User {user_id} disconnected")
