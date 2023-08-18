export const ChooseFolder = () => (
  <>
    <div style={container}>
      <div style={wrapper}>
        <p style={text}>
          Please choose <br /> a folder
        </p>
      </div>
    </div>
    <div
      style={{
        position: "relative",
        top: "3.5rem",
        width: "75%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={text}>Please choose a folder first</p>
      </div>
    </div>
  </>
);

const container = {
  position: "relative",
  top: "3.5rem",
  width: "25%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRight: "1px solid #d1d5db",
};

const wrapper = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const text = {
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  textAlign: "center",
};
