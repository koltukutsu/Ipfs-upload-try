/* src/App.js */
// import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

function App() {
  const [images, updateImages] = useState("");

  async function addImages(imgFileUrl) {
    let randomThing = Math.floor(Math.random() * 10) + 1;
    let imgElement = imgFileUrl && (
      <div className="Img-holder">
        <img src={imgFileUrl} width="600px" alt={randomThing} />
      </div>
    );
    updateImages([...images, imgElement]);
  }
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      console.log(file);

      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      addImages(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
      alert("Error uploading file: ", error);
    }
  }
  return (
    <div className="App">
      <div className="Ipfs-holder">
        <h1>IPFS Uploading Example</h1>
        <input type="file" onChange={onChange} />
      </div>
      <div className="Img-displayer">{images}</div>
    </div>
  );
}

export default App;
