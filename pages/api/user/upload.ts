import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";
import * as formidable from "formidable";
import fs from "fs";
import type { UploadApiResponse } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest) {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    }
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { files } = await parseForm(req);
    const fileField = files.file || Object.values(files)[0];
    if (!fileField) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    const fileArray = Array.isArray(fileField) ? fileField : [fileField];
    const file = fileArray[0];
    if (!file || !file.filepath) {
      return res.status(400).json({ error: "Arquivo inválido." });
    }

    const stream = fs.createReadStream(file.filepath);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error || !result) {
          console.log("Erro no upload:", error);
          return reject(error || new Error("Erro no upload"));
        }
        resolve(result);
      });

      stream.pipe(upload);
    });

    console.log("Upload concluído:", result);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Erro no upload:", error);
    return res
      .status(500)
      .json({
        error: "Falha no upload",
        detail: error instanceof Error ? error.message : error,
      });
  }
}
