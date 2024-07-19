function Headers() {
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          width: "1400px",
          // height: "36px",
          marginLeft: "60px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontFamily: "Roboto",
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "36px",
            textAlign: "left",
          }}
        >
          Vacancy Management
        </h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <span style={{ marginTop: "35px" }}>Home</span>
          <span style={{ marginTop: "35px" }}>Create vacancy</span>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          boxShadow: "0 4px 8px",
          margin: "20px",
        }}
      ></div>
    </div>
  );
}

export default Headers;
