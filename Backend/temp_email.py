from app.utils.email_validator import validate_email

emails = [
    "john@gmail.com",
    "john@openai.com",
    "john@yahoo.com",
    "john@gmail",
    "john@fake.fake",
    "john@fuf.uifiwhf",
]

for email in emails:
    print(email, "->", validate_email(email))