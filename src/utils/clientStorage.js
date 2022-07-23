const initClientStorage = (storageKey, data, id, isLoggedIn) => {
    if (!isLoggedIn && getForms(storageKey, isLoggedIn)) {
        return;
    }

    const form = Object.assign({}, data, { id: id });

    if (storageKey === 'Personal') {
        setForms(storageKey, form, isLoggedIn);
    } else {
        setForms(storageKey, [form], isLoggedIn);
    }
};

const getForms = (storageKey, isLoggedIn) => {
    const forms = isLoggedIn
        ? sessionStorage.getItem(storageKey)
        : localStorage.getItem(storageKey);

    return JSON.parse(forms);
};

const setForms = (storageKey, data, isLoggedIn) => {
    isLoggedIn
        ? sessionStorage.setItem(storageKey, JSON.stringify(data))
        : localStorage.setItem(storageKey, JSON.stringify(data));
};

const getAllForms = isLoggedIn => {
    let personal = getForms('Personal', isLoggedIn);
    let work = getForms('Work', isLoggedIn);
    let education = getForms('Education', isLoggedIn);
    let skills = getForms('Skills', isLoggedIn);

    return {
        personal,
        work,
        education,
        skills
    };
};

export { initClientStorage, getForms, setForms, getAllForms };
