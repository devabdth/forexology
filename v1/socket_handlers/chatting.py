from flask import Flask
from flask_socketio import SocketIO, send


class ChattingHandler:
    def __init__(self, app: Flask, socket: SocketIO):
        self.app = app
        self.socket = socket
