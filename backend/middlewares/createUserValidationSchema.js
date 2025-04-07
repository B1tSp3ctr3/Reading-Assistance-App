export const  createUserValidationSchema ={
    name :{
        
        // notEmpty: true,
        notEmpty :{
            errorMessage: "Name mustn't be empty",
        },
        // isString: true,
        isString:{
            errorMessage: "Name should be a string",
        }
    },
    password:{
        notEmpty: {
            errorMessage: "Password can't be empty",
        },
        isLength:{
            options:{
                min:8
            },
            errorMessage:"Length of password must be greater than 8",
        }
    },
    email:{
        notEmpty:{
            errorMessage:"Email can't be empty",
        },
        isEmail:{
            errorMessage:"Invalid email",
        }
    }

}