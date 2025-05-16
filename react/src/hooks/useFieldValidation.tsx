import React from "react";

const useFieldValidation = () => {

     /**
     * Build the validation class based on the type of error message
     */
    const buildValidationClass = (invalidState:any) => {

        const isInValidPattern = invalidState.type == "pattern" ? true : false;
        const isInValidRequired = invalidState.type == "required" ? true : false;
        // Set the base class
        let invalidClass = "invalid-field";

        if (isInValidRequired) {
            invalidClass += "-required";
        }

        if (isInValidPattern) {
            invalidClass += "-regex";
        }

        return invalidClass;
    } 

    const checkForErrors = (errorObject:any) => {
        errorObject ? true : false;

    }

    return {
        buildValidationClass,
        checkForErrors
    }
}

export default useFieldValidation;