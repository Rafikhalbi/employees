from flask import Flask, request, jsonify
from libs.database import Db

app = Flask(__name__)
db = Db("employees.db")
tb_name = "employees"

@app.route("/api/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    db.insert_data(tb_name, data)
    return jsonify({"message": "User added successfully!"}), 200

@app.route("/api/edit_user", methods=["PUT"])
def edit_user():
    data = request.get_json()
    user_id = data.get("id")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    condition = f"id = {user_id}"
    update_data = {key: value for key, value in data.items() if key != "id"}
    db.update_data(tb_name, update_data, condition)
    return jsonify({"message": "User updated successfully!"}), 200

@app.route("/api/delete_user", methods=["DELETE"])
def delete_user():
    data = request.get_json()
    user_id = data.get("id")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    condition = f"id = {user_id}"
    db.delete_data(tb_name, condition)
    return jsonify({"message": "User deleted successfully!"}), 200

@app.route("/api/fetchall")
def fetch_all():
    rows = db.fetch_data("SELECT * FROM employees")
    employees = []
    for row in rows:
        employee = {
            "id": row[0],
            "picture": row[1],
            "name": row[2],
            "position": row[3],
            "salary": row[4],
            "paid_status": row[5]
        }
        employees.append(employee)

    return jsonify(employees)

if __name__ == "__main__":
    app.run(debug=True)
