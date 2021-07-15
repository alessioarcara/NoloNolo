import {useState} from "react";

const useForm = formObj => {
    const [form, setForm] = useState(formObj)

    // const renderFormInputs = () => {
    //     return Object.values(form).map((inputObject)) => {
    //         const { value, labe}
    //     }
    // }

    const handleInputChange = e => {
        setForm({ ...form, })
    }

    return { renderFormInputs }
}
