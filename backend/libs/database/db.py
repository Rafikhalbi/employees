import sqlite3

class Db:
    def __init__(self, db_path) -> None:
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.cursor = self.conn.cursor()

    def execute(self, query, params=None):
        """ Execute database """
        params = params or []
        self.cursor.execute(query, params)
        self.conn.commit()

    def fetch_data(self, query, params=None):
        """ Fetch all data from database """
        if not query:
            raise ValueError("query can't be empty!")
        self.execute(query, params)
        return self.cursor.fetchall()

    def insert_data(self, table, data: dict):
        """ Insert data into the specified table """
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["?"] * len(data))
        values = list(data.values())
        query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        self.execute(query, values)
        
    def update_data(self, table, data, condition):
        """ Update data in table """
        set_clause = ", ".join([f"{key} = ?" for key in data.keys()])
        query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
        self.execute(query, list(data.values()))
        
    def delete_data(self, table, condition):
        """ Delete data in table """
        query = f"DELETE FROM {table} WHERE {condition}"
        self.execute(query)

    def close(self) -> None:
        """ close connection """
        self.conn.close()