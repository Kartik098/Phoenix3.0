import csv
import pandas as pd
import sqlalchemy

file_name = 'C:/Users/karti/Downloads/Resiliency_simulator/src/Tempo.csv'
tbl_name = "aml_master"
engine = sqlalchemy.create_engine(
    "mysql+mysqlconnector://root:Mysql@localhost:3306",
    connect_args={"root": "K@rtik9484"},
)
data = pd.read_csv(file_name)

# Save the datafile to a table
data.to_sql(tbl_name, con=engine)
