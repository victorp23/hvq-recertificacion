"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__)
app.secret_key = 'PassSessionsPy'

import recer.views

