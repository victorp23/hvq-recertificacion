import mysql.connector
from recer import app
from flask import Flask, render_template, session, request, redirect, url_for
from os import environ
from datetime import datetime
from recer import conexion

def connectionBD():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="recertificacion",
        auth_plugin='mysql_native_password'
    )
    return mydb
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
