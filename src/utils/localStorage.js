const getForms = sectionName => {
    return JSON.parse(sessionStorage.getItem(sectionName));
};

const setForms = (sectionName, sectionForms) => {
    sessionStorage.setItem(sectionName, JSON.stringify(sectionForms));
};

const getAllForms = () => {
    const personal = JSON.parse(sessionStorage.getItem('Personal'));
    const work = JSON.parse(sessionStorage.getItem('Work'));
    const education = JSON.parse(sessionStorage.getItem('Education'));
    const skills = JSON.parse(sessionStorage.getItem('Skills'));
    return Promise.resolve({
        personal,
        work,
        education,
        skills
    });
};

export { getForms, setForms, getAllForms };
