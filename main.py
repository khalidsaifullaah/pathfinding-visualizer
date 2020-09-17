def IDvalidator():
    def validateID(id):
        verdict = "Rejected"

        if(len(id) is not 9):
            return verdict
        if(id[0] == 0 and id[1] == 1 and id[2] == 1):
            if((id[3] >= 0 and id[3] <= 1) and (id[4] >= 3 and id[4] <= 9)):
                if(id[5] >= 0 and id[5] <= 3):
                    if((id[6] >= 0 and id[6] <= 9) and (id[7] >= 0 and id[7] <= 9) and (id[8] >= 0 and id[8] <= 9)):
                        verdict = "Accepted"
        return verdict

    def intToChar(id):
        chars = []
        for char in id:
            chars.append(int(char))
        return chars

    id = input("Enter ID: ")
    try:
        # check whether id only contains int
        is_id_int = int(id)
    except:
        print("Enter proper ID")
        return

    # breaking the int into pieces
    id_char = intToChar(id)
    return validateID(id_char)


def complexNumberChecker():
    complex_number = input("Enter Complex Number: ")
    verdict = "Rejected"
    if(len(complex_number) == 4):
        if((complex_number[3] == 'i' or complex_number[2] == 'i')):
            if(complex_number[1] == '+' or complex_number[1] == '-'):
                if(complex_number[0].isalpha() or complex_number[0].isdigit()):
                    verdict = "Accepted"
    elif(len(complex_number) == 6):
        if((complex_number[5] == 'i' or complex_number[4] == 'i')):
            if(complex_number[3] == '+' or complex_number[3] == '-'):
                if((complex_number[2].isalpha() and complex_number[2] is not 'i') or complex_number[2].isdigit()):
                    if(complex_number[1] == '=' and complex_number[0].isalpha()):
                        verdict = "Accepted"
    return verdict

def validateString(_string):
    _string = input("Enter A String: ")
    print(validateString(_string))
    verdict = "Rejected"
    
    #checking in terms of ASCII code
    if(ord(_string[0])>=48 and ord(_string[0])<=57):
        if(ord(_string[1])>=65 and ord(_string[1])<=90):
            if((ord(_string[2])<65 or ord(_string[2])>90) and (ord(_string[2])<97 or ord(_string[2])>122)):
                verdict = "Accepted"
    return verdict

def validateIntAndFloat():
    _intput = input("Enter An Int/Float: ")
    verdict = "Rejected"
    for char in _intput:
        if(char.isalpha()):
            return verdict
    size = len(_intput)
    if(_intput[size-1] != '.'):
        verdict = "Accepted"
    return verdict


def validatePassword():
    password = input("Enter Password: ")
    verdict = "Rejected"
    hasUpperCase = hasLowerCase = hasOneNumber = False
    for char in password:
        if(char >= 'A' and char <= 'Z'):
            hasUpperCase = True
        if(char >= 'a' and char <= 'z'):
            hasLowerCase = True
        if(char >= '0' and char <= '9'):
            hasOneNumber = True
    specialChar = ['@', '#', '$', '&']
    if(len(password) >= 8 and specialChar.count(password[len(password)-1])):
        if(hasUpperCase == True and hasLowerCase == True and hasOneNumber == True):
            verdict = "Accepted"
    return verdict

def main():
    print("Consider The Following-")
    while(True):
        print("\n1. Validate UIU ID \n2. Check Complex Number \n3. Check a string that meets a certain criteria \n4. Validate Int and Float \n5. Validate Password \n")
        choice = input("Enter Your Choice: ")
        print()
        if(choice == '1'):
            print(IDvalidator()+"\n")
        elif(choice == '2'):
            print(complexNumberChecker())
        elif(choice == '3'):
            print(validateString())
        elif(choice == '4'):
            print(validateIntAndFloat())
        elif(choice == '5'):
            print(validatePassword())
        else:
            print("Enter Valid Choice!\n")


if __name__ == "__main__":
    main()
