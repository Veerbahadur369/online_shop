import ChatBoty from "react-chatbotify";
import { useNavigate } from "react-router-dom";
import LlmConnector, { GeminiProvider } from "@rcb-plugins/llm-connector";

// 🔌 LLM Connector: connects to Gemini backend

function ChatBot() {
  const navigate = useNavigate();
let apiKey='AIzaSyA8etGZwExRCjPbF0LSo-czB8huHFMuTKA'
  const settings = {
    general: {
      primaryColor: "#f09fe9",
      secondaryColor: "#fcbe03ff",
      embedded: false,
    },
    audio: { disabled: false },
    header: {
      title: (
        <div
          style={{
            cursor: "pointer",
            margin: 0,
            fontSize: 20,
            fontWeight: "bold",
          }}
          onClick={() =>
            window.open("https://github.com/Veerbahadur369", "_blank")
          }
        >
          Boty
        </div>
      ),
    },
    footer: {
      text: (
        <p className="font-bold">
          Powered by{" "}
          <span
            className="text-amber-500 text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            OnlineShop
          </span>
        </p>
      ),
    },
  };

 // example flow for testing
	const flow  = {
		start: { 
			message: "Hello! Make sure you've set your API key before getting started!",
			options: ["I am ready!"],
			chatDisabled: true,
			path: async (params) => {
				if (!apiKey) {
					await params.simulateStreamMessage("You have not set your API key!");
					return "start";
				}
				await params.simulateStreamMessage("Ask away!");
				return "gemini";
			},
		},
		gemini: {
			llmConnector: {
				// provider configuration guide:
				// https://github.com/React-ChatBotify-Plugins/llm-connector/blob/main/docs/providers/Gemini.md
				provider: new GeminiProvider({
					mode: 'direct',
					model: 'gemini-2.5-flash',
					responseFormat: 'stream',
					apiKey: apiKey,
				}),
				outputType: 'character',
			},
		},
	};
  return (
    <ChatBoty settings={settings} flow={flow} plugins={[LlmConnector()]} />
  );
}

export default ChatBot;
