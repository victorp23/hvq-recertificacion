
import cx_Oracle


# TRN CONEXION ---------------------------------------------------------------------------
def connection():
      con = cx_Oracle.connect('hvq_usrpython/pyth0n2022@172.16.241.31:1521/TRN')
      return con

# SML CONEXION ---------------------------------------------------------------------------
def connectionSML():
      con = cx_Oracle.connect('hvq_usrpython/pyth0n2022@172.16.241.31:1521/SML')
      return con

# PRD CONEXION --------------------------------------------------------------------------
def connectionPRD():
      con = cx_Oracle.connect('vpilco_ro/Exp3rt0#5@172.16.241.31:1521/PRD')
      return con



