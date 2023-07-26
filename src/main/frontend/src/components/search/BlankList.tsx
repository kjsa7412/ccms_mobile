const BlankList = ({isLong = false}: { isLong?: boolean }) => {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: isLong ? "100%" : "50%",
    height: 38,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    border: '1px solid lightgray'
  }}/>;
};

export default BlankList;