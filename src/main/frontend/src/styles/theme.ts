const common = {
    flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
    flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
    flexRow: `
    display: flex;
    justify-content: center;
    align-items: normal;
  `,
    flexColumn: `
    display: flex;
    flex-direction: column;
    justify-content: normal;
    align-items: center;
  `,
};

const lightColor = {
    bgColor: "white",
    mainColor: "#E4007E",
    mainColor_m1: "#E9559C",
    mainColor_m2: "#CEDCF3",
    button: "#013F84"
}

const darkColor = {
    bgColor: "ghostWhite",
    mainColor: "#E4007E",
    mainColor_m1: "#E9559C",
    mainColor_m2: "#CEDCF3",
    button: "#013F84"
}

const theme1 = {
    common,
    color: lightColor,
    height: {
        height1: 30,
        header: 60,
        screenLabel: 35,
        screenSearchItem: 38,
        columnBlank: 10,
        rowBlank: 10,
        tabBlank: 40,
        bottomBlank: 50
    }
};

const theme2 = {
    common,
    color: darkColor,
    height: {
        height1: 60,
        header: 60,
        screenLabel: 35,
        screenSearchItem: 38,
        columnBlank: 10,
        rowBlank: 10,
        tabBlank: 40,
        bottomBlank: 50
    }
};

export {theme1, theme2};