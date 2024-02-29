/* eslint-disable no-unused-vars */
import {
    isValidUsername,
    isValidEmail, 
} from "6pp"


export const userNameValidator = (username) => {

    if (isValidUsername(username)) {
        return {
            isValid: true,
            errorMessage: ""
        }
    }
    return {
        isValid: false,
        errorMessage: "invalid username"
    }

}

export const emailValidator = (email) => {

    if (isValidEmail(email)) {
        return {
            isValid: true,
            errorMessage: ""
        }
    }
    return {
        isValid: false,
        errorMessage: "invalid email"
    }
}

