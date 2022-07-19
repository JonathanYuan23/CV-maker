const getForms = sectionName => {
    return JSON.parse(localStorage.getItem(sectionName));
};

const setForms = (sectionName, sectionForms) => {
    localStorage.setItem(sectionName, JSON.stringify(sectionForms));
};

const getAllForms = () => {
    let personal = JSON.parse(localStorage.getItem('Personal')).form;

    let work = JSON.parse(localStorage.getItem('Work'));
    work = work ? work.forms : [];

    let education = JSON.parse(localStorage.getItem('Education'));
    education = education ? education.forms : [];

    let skills = JSON.parse(localStorage.getItem('Skills'));
    skills = skills ? skills.forms : [];

    return {
        personal,
        work,
        education,
        skills
    };
};

export { getForms, setForms, getAllForms };
