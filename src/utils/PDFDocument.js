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
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={{ fontSize: 21 }}>Jonathan</Text>
                    <Text style={{ fontSize: 21 }}>Yuan</Text>
                    <Text
                        style={{
                            marginTop: 4,
                            fontSize: 18,
                            color: 'rgb(242, 81, 27)'
                        }}
                    >
                        Software Engineer
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
                        Jonathan Yuan
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        1-234-567-890
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        xyz@gmail.com
                    </Text>
                    <Text
                        style={[
                            styles.contentTextMedium,
                            styles.personalContact
                        ]}
                    >
                        github.com/xyz
                    </Text>
                </View>
            </View>
        );
    };

    const skillsSection = () => {
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
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>Languages:</Text>
                        <Text style={styles.contentTextMedium}>
                            Java, C++, Python
                        </Text>
                    </View>
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>
                            Technologies:
                        </Text>
                        <Text style={styles.contentTextMedium}>
                            React, Redux
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const workSection = () => {
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
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>
                            Waterloo - BSc. Honours CS
                        </Text>
                        <Text style={[styles.contentTextSmall]}>
                            2022 - Present, Waterloo, Ontario
                        </Text>
                        <Text style={styles.contentTextMedium}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis porttitor.
                        </Text>
                    </View>
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>
                            Nepean High School - Student
                        </Text>
                        <Text style={[styles.contentTextSmall]}>
                            2018 - 2022, Ottawa, Ontario
                        </Text>
                        <Text style={styles.contentTextMedium}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis porttitor.
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const educationSection = () => {
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
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>
                            Google - Cloud Engineer
                        </Text>
                        <Text style={[styles.contentTextSmall]}>
                            2018 - Present, San Francisco, California
                        </Text>
                        <Text style={styles.contentTextMedium}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis porttitor.
                        </Text>
                    </View>
                    <View style={styles.contentBlock}>
                        <Text style={styles.contentTextLarge}>
                            Citadel - Quant
                        </Text>
                        <Text style={[styles.contentTextSmall]}>
                            2017 - 2018, New York City
                        </Text>
                        <Text style={styles.contentTextMedium}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis porttitor.
                        </Text>
                    </View>
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
