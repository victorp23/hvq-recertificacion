"""
This script runs the Evolucion_prescipcion_hospi application using a development server.
"""

from os import environ
from recer import app

if __name__ == "__main__":
    app.run(ssl_context="adhoc")
