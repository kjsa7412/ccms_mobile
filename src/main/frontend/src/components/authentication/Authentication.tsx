import ScreenContainer from "../containers/ScreenContainer";
import PageTitle from "../PageTitle";
import {theme1 as theme} from "../../styles/theme";
import './Authentication.css';

const Authentication = () => {
    return (
        <ScreenContainer isColor={true}>
            <PageTitle title="Authentication" themeColor={theme.color.mainColor_m1}/>
            <div className="authentication-container">
                <img alt={'logo'} className={"msy101-customImg"} src="img/ccmsLogo2.png"/>
            </div>
        </ScreenContainer>
    )
}

export default Authentication;