import os
import random
from datetime import datetime

import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL")


def get_connection():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL is not set in backend/.env")
    return psycopg2.connect(DATABASE_URL)


@app.get("/api/health")
def health_check():
    return jsonify({"message": "Café Fausse API is running."})


@app.post("/api/newsletter")
def newsletter_signup():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()

    if not email or "@" not in email:
        return jsonify({"error": "Please provide a valid email address."}), 400

    connection = get_connection()

    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO customers (
                        customer_name,
                        customer_email,
                        newsletter_signup
                    )
                    VALUES (%s, %s, TRUE)
                    ON CONFLICT (customer_email)
                    DO UPDATE SET newsletter_signup = TRUE;
                    """,
                    ("Newsletter Subscriber", email),
                )

        return jsonify(
            {"message": "Thank you—welcome to the Café Fausse table."}
        ), 201

    except Exception:
        return jsonify({"error": "Unable to save your signup. Please try again."}), 500

    finally:
        connection.close()


@app.post("/api/reservations")
def create_reservation():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip() or None
    date = data.get("date", "").strip()
    time = data.get("time", "").strip()

    try:
        guests = int(data.get("guests", 0))
    except (TypeError, ValueError):
        guests = 0

    if not name or not email or not date or not time:
        return jsonify({"error": "Please complete all required fields."}), 400

    if "@" not in email:
        return jsonify({"error": "Please provide a valid email address."}), 400

    if guests < 1 or guests > 6:
        return jsonify({"error": "Reservations must be for 1 to 6 guests."}), 400

    try:
        time_slot = datetime.strptime(
            f"{date} {time}",
            "%Y-%m-%d %I:%M %p"
        )
    except ValueError:
        return jsonify({"error": "Please select a valid date and time."}), 400

    connection = get_connection()

    try:
        with connection:
            with connection.cursor() as cursor:
                # Create the customer, or update their details if they already exist.
                cursor.execute(
                    """
                    INSERT INTO customers (
                        customer_name,
                        customer_email,
                        phone_number
                    )
                    VALUES (%s, %s, %s)
                    ON CONFLICT (customer_email)
                    DO UPDATE SET
                        customer_name = EXCLUDED.customer_name,
                        phone_number = COALESCE(
                            EXCLUDED.phone_number,
                            customers.phone_number
                        )
                    RETURNING customer_id;
                    """,
                    (name, email, phone),
                )
                customer_id = cursor.fetchone()[0]

                # Find table numbers already reserved for this exact time slot.
                cursor.execute(
                    """
                    SELECT table_number
                    FROM reservations
                    WHERE time_slot = %s;
                    """,
                    (time_slot,),
                )
                reserved_tables = {row[0] for row in cursor.fetchall()}
                available_tables = list(set(range(1, 31)) - reserved_tables)

                if not available_tables:
                    return jsonify({
                        "error": (
                            "That time is fully booked. "
                            "Please choose another time."
                        )
                    }), 409

                table_number = random.choice(available_tables)

                cursor.execute(
                    """
                    INSERT INTO reservations (
                        customer_id,
                        time_slot,
                        guest_count,
                        table_number
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING reservation_id;
                    """,
                    (customer_id, time_slot, guests, table_number),
                )
                reservation_id = cursor.fetchone()[0]

        return jsonify({
            "message": (
                f"Thank you, {name}. Your table is confirmed for "
                f"{guests} guest(s) at {time} on {date}."
            ),
            "reservation_id": reservation_id,
            "table_number": table_number
        }), 201

    except Exception:
        return jsonify({
            "error": "Unable to create your reservation. Please try again."
        }), 500

    finally:
        connection.close()


if __name__ == "__main__":
    app.run(debug=True, port=5001)