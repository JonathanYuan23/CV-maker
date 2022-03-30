function getForms(sectionName) {
    return JSON.parse(sessionStorage.getItem(sectionName));
}

function setForms(sectionName, sectionForms) {
    sessionStorage.setItem(sectionName, JSON.stringify(sectionForms));
}

export { getForms, setForms };
