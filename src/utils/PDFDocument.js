import React from 'react';
import RalewayBold from '../fonts/Raleway/static/Raleway-Bold.ttf';
import LatoRegular from '../fonts/Lato/Lato-Regular.ttf';
import LatoBold from '../fonts/Lato/Lato-Bold.ttf';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
    PDFViewer
} from '@react-pdf/renderer';

Font.register({
    family: 'Raleway',
    src: RalewayBold,
    fontWeight: 700
});

Font.register({
    family: 'Lato',
    fonts: [{ src: LatoRegular }, { src: LatoBold, fontWeight: 700 }]
});

const styles = StyleSheet.create({
    page: {
        margin: '55 0',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)'
    },

    section: {
        width: '480',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    sectionDivider: {
        height: 2,
        marginBottom: 12,
        backgroundColor: 'rgb(0, 0, 0)'
    },
    sectionDividerSmall: {
        width: 10
    },
    sectionDividerLarge: {
        width: '100%'
    },

    sectionHeader: {
        width: '40%',
        boxSizing: 'border-box',
        padding: 5,
        fontFamily: 'Raleway',
        fontWeight: 700
    },

    sectionContent: {
        width: '60%',
        boxSizing: 'border-box',
        padding: 5,
        fontFamily: 'Lato'
    },

    contentTextSmall: {
        fontSize: 9,
        color: 'rgb(102, 102, 102)',
        marginBottom: 2
    },
    contentTextMedium: {
        fontSize: 10
    },
    contentTextLarge: {
        fontSize: 11,
        fontWeight: 700
    },

    personalName: {
        marginBottom: 5
    },
    personalContact: {
        color: 'rgb(212, 69, 0)'
    },

    contentBlock: {
        marginBottom: 6
    }
});

// Create Document Component
const PDFDocument = ({ cv }) => {
    const personalSection = () => {
        const { personal } = cv;
        const {
            email,
            name,
            'phone number': phoneNumber,
            profession,
            website
        } = personal;
        const [firstName, lastName] = name.split(' ');
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={{ fontSize: 21 }}>{firstName}</Text>
                    <Text style={{ fontSize: 21 }}>{lastName}</Text>
                    <Text
                        style={{
                            marginTop: 4,
                            fontSize: 18,
                            color: 'rgb(242, 81, 27)'
                        }}
                    >
                        {profession}
                    </Text>
                </View>
                <View style={styles.sectionContent}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerLarge
                        ]}
                    ></View>
                    <Text
                        style={[styles.contentTextLarge, styles.personalName]}
                    >
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        {phoneNumber}
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        {email}
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        {website}
                    </Text>
                </View>
            </View>
        );
    };

    const skillsSection = () => {
        const { skills } = cv;
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerSmall
                        ]}
                    ></View>
                    <Text style={{ fontSize: 12 }}>Skills</Text>
                </View>
                <View style={styles.sectionContent}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerLarge
                        ]}
                    ></View>
                    {skills.map(skill => {
                        return (
                            <View key={skill.id} style={styles.contentBlock}>
                                <Text style={styles.contentTextLarge}>
                                    {`${skill.title}: `}
                                </Text>
                                <Text style={styles.contentTextMedium}>
                                    {skill.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    const workSection = () => {
        const { work } = cv;
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerSmall
                        ]}
                    ></View>
                    <Text style={{ fontSize: 12 }}>Experience</Text>
                </View>
                <View style={styles.sectionContent}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerLarge
                        ]}
                    ></View>
                    {work.map(work => {
                        return (
                            <View key={work.id} style={styles.contentBlock}>
                                <Text style={styles.contentTextLarge}>
                                    {`${work.company} - ${work.title}`}
                                </Text>
                                <Text style={[styles.contentTextSmall]}>
                                    {`${work['start date']} - ${work['end date']}, ${work.location}`}
                                </Text>
                                <Text style={styles.contentTextMedium}>
                                    {work.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    const educationSection = () => {
        const { education } = cv;
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerSmall
                        ]}
                    ></View>
                    <Text style={{ fontSize: 12 }}>Education</Text>
                </View>
                <View style={styles.sectionContent}>
                    <View
                        style={[
                            styles.sectionDivider,
                            styles.sectionDividerLarge
                        ]}
                    ></View>
                    {education.map(education => {
                        return (
                            <View
                                key={education.id}
                                style={styles.contentBlock}
                            >
                                <Text style={styles.contentTextLarge}>
                                    {`${education.institution} - ${education.degree}`}
                                </Text>
                                <Text style={[styles.contentTextSmall]}>
                                    {`${education['start date']} - ${education['end date']}, ${education.location}`}
                                </Text>
                                <Text style={styles.contentTextMedium}>
                                    {education.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {personalSection()}
                {skillsSection()}
                {workSection()}
                {educationSection()}
            </Page>
        </Document>
    );
};

const Viewer = () => (
    <PDFViewer width="100%" height="1250">
        <PDFDocument />
    </PDFViewer>
);

export { Viewer, PDFDocument };
