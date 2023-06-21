import React from "react"

export enum MyEnumTest {
    Hello = 'helloAAA',
    Test = 'Test',
}

const Button: React.FC<{ check: MyEnumTest }> = ({ check }) => {
    return <button>MyButton {MyEnumTest.Test} check: {check}</button>
}

export default Button