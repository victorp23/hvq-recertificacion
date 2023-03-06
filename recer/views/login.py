from flask import Flask, render_template, session, request, redirect, url_for
from os import environ
from datetime import datetime
import msal
from os import environ
import requests
from flask_session import Session
from tempfile import mkdtemp
from recer import conexion
from PIL import Image
from werkzeug.utils import secure_filename
import mysql.connector
import base64
from recer import app

def connectionBD():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="recertificacion",
        auth_plugin='mysql_native_password'
    )
    return mydb

#LOGIN -------------------------------------------------------------------------------------------------
@app.route("/loginR", methods=['GET', 'POST'])
def loginR():
    msg = ''
    if request.method == 'POST' and 'cedula' in request.form and 'password' in request.form:
        cedula = request.form['cedula']
        password = request.form['password']
        mysql = connectionBD()
        cursor = mysql.cursor()
        cursor.execute(
            "SELECT u.cedula, u.passUser, u.nameUser, r.nameRol, u.mailUser, u.imgUser1 FROM user u, rol r, user_rol ur WHERE ur.user = u.cedula and r.idRol = ur.rol and cedula = '" + cedula + "'AND passUser = '" + password + "'")
        account = cursor.fetchone()
        if account:
            session['cedula'] = account[0]
            session['name'] = account[2]
            session['rol'] = account[3]
            session['mail'] = account[4]
            session['foto'] = base64.b64encode(account[5]).decode('utf-8')

            if session['rol'] == 'Admin':
                msg = 'Logged in successfully !'
                return render_template('/forms/homeR.html')
            elif session['rol'] == 'Medico':
                return render_template('/forms/medico/medicoHome.html', msg=msg)
        else:
            msg = 'Cedula o clave incorecta!'

    return render_template('loginR.html', msg=msg, year=datetime.now().year)

#REGISTRAR ----------------------------------------------------------------------------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    validar = []
    if request.method == 'POST' and 'cedula1' in request.form and 'email' in request.form and 'password1' in request.form:
        cedula = request.form['cedula1']
        email = request.form['email']
        password = request.form['password1']

        mysql = connectionBD()
        cursor = mysql.cursor()
        cursor.execute("SELECT cedula FROM user WHERE cedula = '" + cedula + "'")
        account = cursor.fetchone()
        if account:
            msg = 'El usuario ya existe!'
        else:
            conn = conexion.connectionPRD()
            cursor12 = conn.cursor()
            cursor12.execute(
                "select  p.NR_DOCUMENTO, p.NM_PRESTADOR from prestador p where NR_DOCUMENTO = '" + cedula + "'")
            for row in cursor12.fetchall():
                validar.append(row[0])
                validar.append(row[1])
            if not validar:
                msg = 'El usuario no se encuentra registrado en el sistema SOUL MV'
            else:
                cursor.execute(
                    "insert into user (cedula, nameUser, mailUser, passUser) values ('" + cedula + "', '" + validar[
                        1] + "', '" + email + "', '" + password + "')")
                mysql.commit()

                cursor.execute("insert into user_rol (rol, user) values (8,'"+validar[1]+"')")
                mysql.commit()
                msg = 'Cuenta creada con exito!'
    return render_template('loginR.html', msg=msg)

# CERRAR SESSION ------------------------------------------------------------------------------------------
@app.route('/cerrarS')
def cerrarS():
    session.pop('rol', None)
    session.pop('name', None)
    session.pop('cedula', None)
    session.pop('foto', None)
    session.pop('mail', None)
    session.clear()
    return redirect(url_for('loginR'))


@app.route('/actualizar_sesion')
def actualizar_sesion():
    mysql = connectionBD()
    cursor = mysql.cursor()
    cursor.execute(
        "SELECT u.imgUser1 FROM user u WHERE  cedula = '" + session['cedula'] + "'")
    img = cursor.fetchone()
    if img:
        session.pop('foto', None)
        session['foto'] = base64.b64encode(img[0]).decode('utf-8')
        return session['foto']


# ---------------LOGIN CON 365 ----------------------------------------------------------------------------------

@app.route("/")
def index():
    if not session.get("user"):
        return redirect(url_for("login"))
    print(session["user"])

    return render_template('index.html', user=session["user"], version=msal.__version__, )


@app.route("/inicioN")
def inicioN():
    # session["flow"] = _build_auth_code_flow(scopes=app_config.SCOPE)
    # return render_template('inicio.html', auth_url=session["flow"]["auth_uri"], version=msal.__version__, year=datetime.now().year)
    return render_template('inicio.html', year=datetime.now().year)


@app.route("/paneles")
def paneles():
    return render_template('Paneles.html', year=datetime.now().year)


@app.route("/agenda")
def agenda():
    return render_template('Agenda.html', year=datetime.now().year)


@app.route("/login")
def login():
    #session["flow"] = _build_auth_code_flow(scopes=app_config.SCOPE)
    #return render_template("login.html", auth_url=session["flow"]["auth_uri"], version=msal.__version__, year=datetime.now().year)
    return render_template("login.html", year=datetime.now().year)

