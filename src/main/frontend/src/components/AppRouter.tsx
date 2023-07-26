import React from "react";
import {Route, Routes} from "react-router-dom";
import MSY101 from "../screens/MSY/MSY101/MSY101";
import MTS101 from "../screens/MTS/MTS101/MTS101";
import MTS101T1 from "../screens/MTS/MTS101T1/MTS101T1";
import MTS102 from "../screens/MTS/MTS102/MTS102";
import MTS102T1 from "../screens/MTS/MTS102T1/MTS102T1";
import MEM101 from "../screens/MEM/MEM101/MEM101";
import MEM101T1 from "../screens/MEM/MEM101T1/MEM101T1";
import MEM102 from "../screens/MEM/MEM102/MEM102";

type Props = {
  isSignIn: boolean;
}

const SignInRoutes = () => (
  <Routes>
    <Route path="/" element={<MTS101/>}/>
    <Route path="/MTS101T1" element={<MTS101T1/>}/>
    <Route path="/MTS102" element={<MTS102/>}/>
    <Route path="/MTS102T1" element={<MTS102T1/>}/>
    <Route path="/MEM101" element={<MEM101/>}/>
    <Route path="/MEM101T1" element={<MEM101T1/>}/>
    <Route path="/MEM102" element={<MEM102/>}/>
  </Routes>
);

const SignOutRoutes = () => (
  <Routes>
    <Route path="/" element={<MSY101/>}/>
  </Routes>
);
const AppRouter = ({isSignIn}: Props) => (
  isSignIn ? <SignInRoutes/> : <SignOutRoutes/>
)

export default AppRouter;