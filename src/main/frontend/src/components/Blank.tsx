import React from 'react';
import {EBlank} from '@custom-enums/common-enum';
import {theme1} from "../styles/theme";

const HeaderBlank = () => <div style={{height: theme1.height.header}}/>
const ColumnBlank = () => <div style={{height: theme1.height.columnBlank}}/>
const RowBlank = () => <div style={{height: theme1.height.rowBlank}}/>
const TabBlank = () => <div style={{height: theme1.height.tabBlank}}/>
const BottomBlank = () => <div style={{height: theme1.height.bottomBlank}}/>

const Blank = ({type}: { type: EBlank }) => {
  return (
    <>
      {type === EBlank.Header && <HeaderBlank/>}
      {type === EBlank.Column && <ColumnBlank/>}
      {type === EBlank.Row && <RowBlank/>}
      {type === EBlank.Tab && <TabBlank/>}
      {type === EBlank.Bottom && <BottomBlank/>}
    </>
  );
};

export default Blank;
