import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [numAllowed, setNumAllowed] = useState(false);
  const [charater, setCharater] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState();
  const passwordref = useRef(null);
  const [btnText, setBtnText] = useState ("Copy")
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    if (numAllowed) str += "1234567890";
    if (charater) str += ":?><!@#$%^&*(){}|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numAllowed, charater, length, setPassword]);

  useEffect(() => {
    setBtnText("Copy")
    passwordGenerator();
  }, [numAllowed, charater, length, passwordGenerator]);

  const copyOnClipBoard = useCallback(() => {
    setBtnText("Copied")
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);

  },[password])

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center bg-black"
        style={{ height: "100vh" }}
      >
        <div className="card bg-dark d-flex flex-column justify-content-center align-items-center px-3 py-3">
          <div className="card-body text-white">
            <h3 className=" text-center">Password Generator</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                value={password}
                className="form-control"
                placeholder="Password"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                ref={passwordref}
              />
              <button
                className="btn btn-outline-white btn-primary"
                type="button"
                id="button-addon2"
                onClick={copyOnClipBoard}
              >
                {btnText}
              </button>
            </div>
            <div className=" d-flex gap-3 align-items-center justify-content-between">
              <div className="d-flex gap-2 justify-content-center align-items-center">
                <input
                  type="range"
                  className="form-range"
                  id="customRange1"
                  min={8}
                  max={20}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <div className="d-flex gap-1">
                  <label className="form-label">Range: </label>
                  <span>{length}</span>
                </div>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => {
                    setNumAllowed((prev) => !prev);
                  }}
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label">Number</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={() => {
                    setCharater((prev) => !prev);
                  }}
                />
                <label className="form-check-label">Charater</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
