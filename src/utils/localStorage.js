const getForms = sectionName => {
    return JSON.parse(sessionStorage.getItem(sectionName));
};

const setForms = (sectionName, sectionForms) => {
    sessionStorage.setItem(sectionName, JSON.stringify(sectionForms));
};

export { getForms, setForms };
