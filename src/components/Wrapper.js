function Wrapper({ children }) {
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="island"></div>
        {children}
        <div className="bottom"></div>
      </div>
      <i className="btn btn1"></i>
      <i className="btn btn2"></i>
      <i className="btn btn3"></i>
      <i className="rightSideBtn"></i>
    </div>
  );
}

export default Wrapper;
