import FormData from "form-data";
import fetch from "node-fetch";

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime.startsWith("image/")) {
      return conn.reply(m.chat, `*Ｙ ｌａ ｉｍａｇｅｎ？*`, m);
    }
    await m.reply("⌛ ᴀɴᴅᴏ ᴍᴇᴊᴏʀᴀɴᴅᴏ ʟᴀ ᴄᴀʟɪᴅᴀᴅ ᴅᴇ ʟᴀ ɪᴍᴀɢᴇɴ ᴇꜱᴘᴇʀᴇᴍᴇ :3");
    let img = await q.download();
    let url = await enhanceImage(img);
    await conn.sendFile(m.chat, url, "out.png", "", m);
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`, m);
  }
};

handler.help = ["hd"];
handler.tags = ["tools"];
handler.command = ["remini", "hd", "enhance"];
handler.register = true;
handler.diamond = 2;

export default handler;

async function enhanceImage(imageData) {
  try {
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });

    const response = await fetch(
      "https://inferenceengine.vyro.ai/enhance.vyro",
      {
        method: "POST",
        body: formData,
        headers: {
          ...formData.getHeaders(),
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error al procesar la imagen: ${response.status} - ${response.statusText}`,
      );
    }

    const result = await response.buffer();
    return result;
  } catch (error) {
    throw new Error(
      `Error al mejorar la calidad de la imagen: ${error.message}`,
    );
  }
}
