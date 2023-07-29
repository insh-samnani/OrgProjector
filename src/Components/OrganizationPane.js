import React, { useState } from 'react'

export default function OrganizationPane(props) {

    const [hover, setHover] = useState(false)
    const onHoverHandler = () => {
        setHover(true);
    };

    const onHoverOutHandler = () => {
        setHover(false);
    };
    const { organization } = props;
    return (
        <>

            <a href={`/organizationDetail/${organization._id}`} className="list-group-item list-group-item-action" style={hover ? { backgroundColor: "#590268", color: "rgb(244, 226, 247)" } : { backgroundColor: "rgb(244, 226, 247)" }} onMouseEnter={onHoverHandler}
                onMouseLeave={onHoverOutHandler}>
                <i className="fa-solid fa-arrow-turn-up fa-rotate-90 mx-2"></i>{organization.name}
            </a >
        </>
    )
}
