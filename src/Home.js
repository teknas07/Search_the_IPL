import React from "react";
import { Image } from "semantic-ui-react";
import "./styles.css";

export default function Home() {
  return (
    <div className="home">
      <Image
        src="https://raw.githubusercontent.com/vijethph/ipldata/main/src/assets/logo.png"
        size="massive"
      />
    </div>
  );
}
