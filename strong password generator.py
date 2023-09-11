import random
import string

def generate_password(length, include_numbers=True, include_special_chars=True):
    characters = string.ascii_letters
    if include_numbers:
        characters += string.digits
    if include_special_chars:
        characters += string.punctuation
    
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def main():
    print("Welcome to the Strong Password Generator!")
    
    length = int(input("Enter the desired password length: "))
    include_numbers = input("Include numbers? (y/n): ").lower() == "y"
    include_special_chars = input("Include special characters? (y/n): ").lower() == "y"
    
    password = generate_password(length, include_numbers, include_special_chars)
    
    print("Generated password:", password)

if __name__ == "__main__":
    main()
