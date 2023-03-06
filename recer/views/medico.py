import mysql.connector
from recer import app
from flask import Flask, render_template, session, request, redirect, url_for
from os import environ
from datetime import datetime
from recer import conexion
from recer.views.login import actualizar_sesion


def connectionBD():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="recertificacion",
        auth_plugin='mysql_native_password'
    )
    return mydb

@app.route("/homeM")
def homeM():

    if 'rol' in session:
        return render_template('/forms/medico/medicoHome.html', year=datetime.now().year)
    else:
        return render_template('loginR.html')
@app.route("/conf_medico")
def conf_medico():
    if 'rol' in session:
        return render_template('/forms/medico/conf_medico.html',year=datetime.now().year)
    else:
        return render_template('loginR.html')

@app.route("/act_academica")
def act_academica():
    if not 'rol' in session:
        return redirect(url_for("loginR"))
    else:
        return render_template('/forms/medico/act_acad.html', year=datetime.now().year)

@app.route("/educacion_hvq")
def edu_hvq():
    if not 'rol' in session:
        return render_template('loginR.html')
    else:
        return render_template('/forms/medico/edu_hvq.html', year=datetime.now().year)

@app.route("/foto", methods=['GET', 'POST'])
def foto():
    cedula = session["cedula"]
    if request.method == 'POST':
        foto = request.files['foto1']
        #return f'Uploded: {foto.filename}'
        mysql = connectionBD()
        cursor = mysql.cursor()
        cursor.execute('UPDATE user SET imgUser1 = %s WHERE cedula = %s', (foto.read(), cedula))
        mysql.commit()
        cursor.close()
        actualizar_sesion()
    return redirect("/conf_medico")