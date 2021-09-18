/**
 * FormDataの生成関数
 * @param values 
 * @returns 
 */
const generateFormData = <T>(values: T) => {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(values)) {
        formdata.append(key.toString(), value);
    }

    return formdata;
}

export default generateFormData