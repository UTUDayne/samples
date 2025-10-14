import sqlite3

connection = sqlite3.connect("db.db")
cursor = connection.cursor()


fields = ("\'name\', \'description\', \'length\', 'rating'")
test_values = ("'blurt', 'blue', 4, 4")

# cursor.execute("INSERT INTO trails " + fields + " " + test_values)
# connection.commit()



class DB:
    def __init__(self, filename):
        self.filename = filename
        self.connection = sqlite3.connection(self.filename)
        self.cursor = self.connection.cursor
    
    def readall(self):
        self.cursor.execute("SELECT * FROM trails")
        records = self.cursor.fetchall()
        all = {}
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        print(all)
        return all
    
    def insert(self, data):
        record = [data['name'], data['length']]
        self.cursor.execute("INSERT INTO trails (name, length) VALUES (?, ?, ?, ?);", record)
        self.connection.commit

    def delete(self, id):
        self.cursor.execute("DELETE FROM trails WHERE id=?", [id])
        self.connection.commit()

    def closeDB(self):
        self.connection.close()

if __name__ == "__main__":
    db = DB(self, "db.db")
    db.readall()
    db.insert(record)
    db.close()