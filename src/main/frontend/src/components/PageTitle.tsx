import {Helmet} from 'react-helmet-async';
import React from 'react';
import {theme1 as theme} from '../styles/theme';
import {useRecoilState} from 'recoil';
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../atoms/menuAtom";

interface PageTitle {
  title: string;
  themeColor?: string;
}

function PageTitle({title = '', themeColor = '#fefefe'}: PageTitle) {
  const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);

  return (
    <Helmet>
      <title>{title} | NaraOSS</title>
      <meta name="description" content="Web site created using create-react-app"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
      <meta name="theme-color" content={rcMenu.isMenuOpened ? theme.color.mainColor : themeColor}/>
      <meta name="format-detection" content="telephone=no"/>
    </Helmet>
  );
}

export default PageTitle;
