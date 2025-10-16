import sqlite3

fields = ("\'name\', \'description\', \'length\', 'rating'")
test_values = ("'blurt', 'blue', 4, 4")

# cursor.execute("INSERT INTO trails " + fields + " " + test_values)
# connection.commit()

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class DB:
    def __init__(self, filename):
        self.filename = filename
        self.connection = sqlite3.connect(self.filename)
        self.cursor = self.connection.cursor()
    
    def readall(self):
        self.cursor.execute("SELECT * FROM trails")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        print(all)
        return all
    
    def insert(self, data):
        record = [data['name'], data['length']]
        self.cursor.execute("INSERT INTO trails (name, length) VALUES (?, ?);", record)
        self.connection.commit()

    def update(self, id, data):
        record = [data['name'], data['length'], id]
        self.cursor.execute("UPDATE trails SET name=?, length=? WHERE id=?;", record)
        self.connection.commit()

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