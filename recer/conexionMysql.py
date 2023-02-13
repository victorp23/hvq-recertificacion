import mysql.connector

def connectionBD():
    mydb = mysql.connector.connect(
        host ="LH2-TIC-16CAP",
        user ="rootdos",
        passwd ="root",
        database = "recertificacion",
        auth_plugin='mysql_native_password'
        )
    return mydb
    '''       
    if mydb:
        return ("Conexion exitosa")
    else:
        return ("Error en la conexion a BD")
    '''
