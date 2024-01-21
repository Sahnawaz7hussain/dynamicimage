import { useState } from "react";
import Canvas from "./components/Canvas";
import axios from "axios";

export default function App() {
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const data = {
    jobRole: "HR Manager",
    companyName: "Wownooks",
    responsibilities: [
      "Working with a good and dynamic team",
      "able to quickly learn and implement new thingssdfs sdfsdf sdfdsf sdfsdf sfjlkj ljksdf sdflkj sdflj sdfljk sdflj sdflkj sdflkj sdfjl sdfljk sdflkj sdflkj sdflkjs sdflkj sdflkj sdflkj sdfljk sdflkj ",
      "AAAable to give better work in php projects, able to build reusable and dynamic components and help junios to grow andsdfsd sdfs sdsdf sdfsdf sdfsdf sdfljj asdb sdfsj;l sdfsdf ddd  sdfsdlj sdfsd sdfsdlk sdfsdflkj  fsdfs sdfsd sdfsd sdfs sdfs sdfs sdfs sdfs sdf sdf sdf sfsd sdfsdf  build app quickly perfectlyfff.",
      "sdf lkj",
      "AAAable to give better work in php projects, able to build reusable and dynamic components and help junios to grow andsdfsd sdfs sdsdf sdfsdf sdfsdf sdfljj asdb sdfsj;l sdfsdf ddd  sdfsdlj sdfsd sdfsdlk sdfsdflkj  fsdfs sdfsd sdfsd sdfs sdfs sdfs sdfs sdfs sdf sdf sdf sfsd sdfsdf  build app quickly perfectlyfff.",
      "fff",
    ],
  };
  const generateImgg = () => {
    setLoading(true);
    setError("");
    axios
      .post(
        "http://localhost:5500/temp",
        { ...data, name: "Sahnawaz" },
        {
          headers: {
            Authorization:
              "breare sdfsdfsdfjsd;lfffffffffffffffffffffffj;lsdjf",
          },
        }
      )
      .then((res) => {
        console.log("rrrrrrrrr ", res);
        setLoading(false);
        setImgFile(res.data.imageFile);
      })
      .catch((err) => {
        console.log("eeeeeeeeeeeee ", err);
        setLoading(false);
        setError(err.message);
      });
  };

  const generateImg = () => {
    setLoading(true);
    setError("");

    axios
      .post(
        "http://localhost:5500/temp",
        { ...data, name: "Sahnawaz" },
        {
          headers: {
            Authorization: "your_token_here",
          },
          responseType: "arraybuffer", // Important for binary data
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "image/png" });
        const imageFile = new File([blob], "generated_image.png", {
          type: "image/png",
        });

        setImgFile(imageFile);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
        setError(err.message);
      });
  };
  console.log("img file ", imgFile);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Dynamic Image generation by canvas</h2>
      {loading ? (
        <h3>Generating img</h3>
      ) : (
        <button style={{ width: "fit-content" }} onClick={generateImg}>
          Generate Image
        </button>
      )}
      <br />
      <img
        src={
          imgFile
            ? URL.createObjectURL(imgFile)
            : "https://th.bing.com/th/id/OIP.c17XAqg6srb_lo1ElbyJSgAAAA?rs=1&pid=ImgDetMain"
        }
        alt="dfdfd"
        width={400}
        height={500}
      />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
