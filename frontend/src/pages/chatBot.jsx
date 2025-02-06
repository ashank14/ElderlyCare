import { px } from "framer-motion";
import { useEffect } from "react";

const chatbot = () => {
  useEffect(() => {
    // Check if the script is already added
    if (!document.querySelector("script[src='https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js']")) {
      const script = document.createElement("script");
      script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ marginLeft:"30px" }}> {/* Adjust the margin as needed */}
      <zapier-interfaces-chatbot-embed
        is-popup="false"
        chatbot-id="cm6ton0yp000vwa1nhv6glfsy"
        height="600px"
        width="1000px"
      ></zapier-interfaces-chatbot-embed>
    </div>
  );
};

export default chatbot;
