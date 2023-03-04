import React from 'react'

const styles = {
    contentArea: {
        width: "932px",
        height: "842px",
        left: "228px",
        top: "57px",
        background: "#F8FAFB"
    },
    projectOverviewBox: {
        boxSizing: "border-box",
        position: "absolute",
        width: "892px",
        height: "156px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        marginLeft: "20px",
        marginTop: "20px"
    },
    projectOverviewHeading: {
        width: "146px",
        height: "28px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        lineHeight: "28px",
        marginLeft: "16px",
        marginTop: "16px",
        color: "#0A0A0A"
    }
}

const Home = () => {
    return (
        <>
            <div>
                <div style={styles.contentArea}>
                    <div style={styles.projectOverviewBox}>
                        <p style={styles.projectOverviewHeading}>Projects Overview</p>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home