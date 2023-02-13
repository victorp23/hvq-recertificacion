from flask import Flask, render_template, session, request, redirect, url_for
from os import environ
from datetime import datetime
import msal
from os import environ
import requests
from flask_session import Session
from tempfile import mkdtemp
from recer import conexion
import mysql.connector
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


# --------------------------------------------------------------------------------------------------------------------------------------

@app.route("/loginR", methods=['GET', 'POST'])
def loginR():
    msg = ''
    if request.method == 'POST' and 'cedula' in request.form and 'password' in request.form:
        cedula = request.form['cedula']
        password = request.form['password']
        mysql = connectionBD()
        cursor = mysql.cursor()
        cursor.execute(
            "SELECT u.cedula, u.passUser, u.nameUser, r.nameRol FROM user u, rol r, user_rol ur WHERE ur.user = u.cedula and r.idRol = ur.rol and cedula = '" + cedula + "'AND passUser = '" + password + "'")
        account = cursor.fetchone()
        if account:
            session['rol'] = account[3]
            session['name'] = account[2]
            if session['rol'] == 'Admin':
                msg = 'Logged in successfully !'
                return render_template('/forms/homeR.html')
            elif session['rol'] == 'Medico':
                return render_template('/forms/medicoHome.html', msg=msg)
        else:
            msg = 'Cedula o clave incorecta!'
    return render_template('loginR.html', msg=msg, year=datetime.now().year)


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
            msg = ' El usuario ya existe!'
        else:
            conn = conexion.connectionPRD()
            cursor12 = conn.cursor()
            cursor12.execute(
                "select  p.NR_DOCUMENTO, p.NM_PRESTADOR from prestador p where NR_DOCUMENTO = '" + cedula + "'")
            for row in cursor12.fetchall():
                validar.append(row[0])
                validar.append(row[1])
            if not validar:
                msg = 'El usuario no se encuentra en el sistema PEP'
            else:
                cursor.execute(
                    "insert into user (cedula, nameUser, mailUser, passUser) values ('" + cedula + "', '" + validar[
                        1] + "', '" + email + "', '" + password + "' )")
                mysql.commit()
                msg = 'Cuenta creada con exito!'
    return render_template('loginR.html', msg=msg)


@app.route('/cerrarS')
def cerrarS():
    session.pop('rol', None)
    session.pop('name', None)
    session.clear()
    return redirect(url_for('loginR'))


@app.route("/act_academica")
def act_academica():
    if 'rol' in session:
        return render_template('/forms/act_acad.html', year=datetime.now().year)
    else:
        return render_template('loginR.html')


@app.route("/homeR")
def homeR():
    if 'rol' in session:
        return render_template('/forms/homeR.html', year=datetime.now().year)
    else:
        return render_template('loginR.html')


@app.route('/medicosR')
def medicosR():
    if not 'rol' in session:
        return redirect(url_for("loginR"))
    else:
        if session['rol'] == 'Admin':
            medicos = []
            con = conexion.connectionPRD()
            cursor = con.cursor()
            cursor.execute("""
                        SELECT CD_PRESTADOR, NM_PRESTADOR,
                        CASE
                            WHEN DS_EMAIL IS NOT NULL THEN DS_EMAIL
                            WHEN DS_EMAIL IS NULL THEN 'NO'
                        END,
                        TP_SITUACAO
                        FROM PRESTADOR
                        WHERE CD_TIP_PRESTA = 8
                        ORDER BY NM_PRESTADOR
            """)
            for row in cursor.fetchall():
                medicos.append({"cd": row[0], "nombre": row[1], "email": row[2], "estado": row[3]})
            con.close()
            return render_template('/forms/MedicosR.html', medicos=medicos, year=datetime.now().year)
        else:
            return redirect(url_for("loginR"))


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

@app.route('/viewP/<id>', methods=['GET'])
def viewP(id):
    if not session.get("user"):
        return redirect(url_for("inicioN"))
    else:
        medico = []
        con = conexion.connectionPRD()
        cursor = con.cursor()
        cursor.execute("""
                        SELECT CD_PRESTADOR, NM_PRESTADOR
                        from PRESTADOR
                        where CD_PRESTADOR = 
                    """ + id)
        for row in cursor.fetchall():
            medico.append({"cd": row[0], "nombre": row[1]})
        con.close()
        return render_template('viewP.html', medico=medico)