import React from 'react'

const ProjectDetail = () => {
    return (
        <>
            <div className="row justify-content-evenly" style={{ height: "100%", overflow: "hidden" }}>
                <div
                    className="d-flex align-content-center flex-wrap"
                    style={{
                        maxWidth: "12vw",
                        height: "92vh",
                        textAlign: "center",
                        borderRight: "1px solid black"
                    }}
                >
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }}>
                            Project Details
                        </p>
                        <hr />
                    </div>
                    <div  className='col-12'>
                        <p style={{ cursor: "pointer" }}>
                            Orders
                        </p>
                        <hr />
                    </div>
                    <div  className='col-12'>
                        <p style={{ cursor: "pointer" }}>
                            Payments
                        </p>
                        <hr />
                    </div>
                    <div  className='col-12'>
                        <p style={{ cursor: "pointer" }}>
                            Invoices
                        </p>
                        <hr />
                    </div>

                </div>
                <div
                    className=""
                    style={{ width: "84vw", height: "92vh", overflowY: "scroll" }}
                >

                </div>
            </div>
        </>
    )
}

export default ProjectDetail