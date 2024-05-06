import cheerio from "cheerio";
import axios from "axios";
import util from "util";

let handler = async (message, { conn, isOwner, usedPrefix, command, args }) => {
  const text = args.join(" ");
  if (!text || !args[0]) throw "Mensaje vacío.";

  let contactPage = await axios.get(
    "https://www.whatsapp.com/contact/noclient/",
  );
  let actionPage = await axios.get("https://www.whatsapp.com");

  let cookies = contactPage.headers["set-cookie"];
  let scripts = contactPage.data.split("; ");

  let $ = cheerio.load(contactPage.data);
  let actionForm = $("form").attr("action");
  let formURL = new URL(actionForm, "https://www.whatsapp.com").href;
  let formData = new URLSearchParams();

  formData.append("jazoest", $("[name=jazoest]").val());
  formData.append("lsd", $("[name=lsd]").val());
  formData.append("format", "JSON");
  formData.append("country_selector", "ID");
  formData.append("platform", "ANDROID");
  formData.append("phone_number", text);
  formData.append("command", "0");
  formData.append("__a", "1");
  formData.append("__csr", "");
  formData.append("dpr", "8");
  formData.append("get", "form");
  formData.append("__ccg", "1006630858");
  formData.append("__rev", "2535995");
  formData.append("__user", "1465");
  formData.append("__req", "fb");

  let response = await axios({
    url: formURL,
    method: "POST",
    data: formData,
    headers: { cookie: cookies },
  });

  let responseBody = String(response.data);

  if (responseBody.includes("your_message")) message.reply("Hola");
  else {
    if (responseBody.includes("format")) message.reply("Adiós");
    else
      message.reply(
        util.inspect(JSON.parse(response.data.replace("for (;;);", ""))),
      );
  }
};

handler.command = /^(supportwa|swa|logout|support|deactivatewa|mandsupport)$/i;
handler.owner = true;

export default handler;
