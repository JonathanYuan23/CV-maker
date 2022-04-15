const getForms = sectionName => {
    return JSON.parse(sessionStorage.getItem(sectionName));
};

const setForms = (sectionName, sectionForms) => {
    sessionStorage.setItem(sectionName, JSON.stringify(sectionForms));
};

const getAllForms = () => {
    let personal = JSON.parse(sessionStorage.getItem('Personal')).form;

    let work = JSON.parse(sessionStorage.getItem('Work'));
    work = work ? work.forms : [];

    let education = JSON.parse(sessionStorage.getItem('Education'));
    education = education ? education.forms : [];

    let skills = JSON.parse(sessionStorage.getItem('Skills'));
    skills = skills ? skills.forms : [];

    return Promise.resolve({
        personal,
        work,
        education,
        skills
    });
};

export { getForms, setForms, getAllForms };
