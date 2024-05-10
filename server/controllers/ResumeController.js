import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/gemini.js";
import fs from "fs";
import PDFParser from "pdf2json";
import { curriculum_example } from "../data.js";

const generationConfig = {
  temperature: 0,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 5000,
  response_mime_type: "application/json",
};

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const cleanText = (text) => {
  // Remover espaços para corrigir separações indevidas
  return text.replace(" ","");
};

// Função para ler e extrair texto de um PDF
const extractTextFromPDF = async (pdfBuffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData) =>
      reject(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(" ")
      ).join("\n");
      resolve(cleanText(text));
    });
    pdfParser.parseBuffer(pdfBuffer);
  });
};

// Converts local file information to a GoogleGenerativeAI.Part object.
const fileToGenerativePart = (path, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
};

const index = async (req, res) => {
  try {
    const pdfText = await extractTextFromPDF(req.file.buffer);
    // const pdf = await extractTextFromPDF("curriculums/Curriculo-VInicius.pdf");
    const prompt = `usando esses dados: ${pdfText} preencha o seguinte json: ${JSON.stringify(
      curriculum_example
    )} ------------------ Não invente dados, use os dados do currículo, caso um dado não seja encontrado preencha a propriedade com null`;

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    console.log(result);
    const response = result.response;
    const text = response.text();

    res.json(JSON.parse(text));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { index };
