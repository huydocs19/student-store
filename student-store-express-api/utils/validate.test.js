const { UnprocessableEntityError } = require("./errors")
const {validateFields, isNil} = require("./validate")

describe("Can determine nil and non-nil values", () => {
    test("Can determine nil values", () => {
        expect(isNil(null)).toBeTruthy()
        expect(isNil(undefined)).toBeTruthy()
    })
    test("Can determine non-nil values", () => {
        expect(isNil("")).toBeFalsy()
        expect(isNil("lebron")).toBeFalsy()
    })
})

describe("Can validate fields", () => {
  test("Does not raise errors when providing correct fields", () => {
    try {
        validateFields({
            required: ["username"],
            obj: {
                username: "lebron"
            },
            location: "token generation"
        })
    } catch(err) {
        expect(err instanceof UnprocessableEntityError).toBeFalsy()        
    }
  })
  test("Raise errors when providing incorrect fields", () => {
    try {
        validateFields({
            required: ["username"],
            obj: {
                email: "lebron@james.io"
            },
            location: "token generation"
        })
    } catch(err) {
        expect(err instanceof UnprocessableEntityError).toBeTruthy()        
    }
  })
})