import conexionMysql

def obtener():
    conexion = conexionMysql.obtener_conexion()
    roles = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT idRol FROM ROL")
        roles = cursor.fetchall()
    conexion.close()
    return roles
