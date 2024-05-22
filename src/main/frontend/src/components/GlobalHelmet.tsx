import React from "react";
import {Helmet} from "react-helmet-async"

const GlobalHelmet = () => {
    return (
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUITE/fonts/static/woff2/SUITE.css" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700&family=Roboto:wght@100;400;700&display=swap" rel="stylesheet"/>
        </Helmet>
    )
}

export default GlobalHelmet;