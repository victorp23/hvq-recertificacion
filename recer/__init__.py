"""
The flask application package.
"""

from flask import Flask, session
from flask_session import Session

app = Flask(__name__)
app.secret_key = 'PassSessionsPy'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = '/tmp/flask_session'

Session(app)


import recer.views.login
import recer.views.medico
import recer.views.admin