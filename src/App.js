/* src/App.js */
// import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

function App() {
  // const [fileUrl, updateFileUrl] = useState(``);
  const [images, updateImages] = useState("");

  async function addImages(imgFileUrl) {
    let imgElement = imgFileUrl && <img src={imgFileUrl} width="600px" />;
    updateImages([...images, imgElement]);
  }
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      console.log(file);

      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      // updateFileUrl(url);
      addImages(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div className="App">
      <div className="Ipfs-holder">
        <h1>IPFS Uploading Example</h1>
        <input type="file" onChange={onChange} />
      </div>
      <div className="imgDisplay">{images}</div>
    </div>
  );
}

export default App;
