// Este codigo fue echo por Gabriel Curi, si vas cargar mis plugins dame creditos crack Saludos
import axios from 'axios';
const baileys = (await import("@whiskeysockets/baileys")).default;
const { proto } = baileys;
const { generateWAMessageFromContent } = baileys;
const { generateWAMessageContent } = baileys;

let handler = async (message, { conn, text }) => {
    if (!text) {
        return conn.reply(message.chat, ' *¿Qué video de Facebook quieres descargar? :3*', message);
    }

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent(
            { video: { url } },
            { upload: conn.waUploadToServer }
        );
        return videoMessage;
    }

    try {
        const { data: response } = await axios.get(`https://rembotapi.vercel.app/api/facebookdl?url=${encodeURIComponent(text)}`);

        if (!response.success) {
            return conn.reply(message.chat, ' *No se pudo descargar el video. :c*', message);
        }

        const hdUrl = response.hd;
        const sdUrl = response.sd;
        const title = response.title;

        const hdVideoMessage = await createVideoMessage(hdUrl);
        const sdVideoMessage = await createVideoMessage(sdUrl);

        const responseMessage = generateWAMessageFromContent(
            message.chat,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: null
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ' `𝙁 𝘼 𝘾 𝙀 𝘽 𝙊 𝙊 𝙆  𝘿 𝙊 𝙒 𝙉 𝙇 𝙊 𝘼 𝘿 𝙀 𝙍`'
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: null,
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: [
                                    {
                                        body: proto.Message.InteractiveMessage.Body.fromObject({
                                            text: null
                                        }),
                                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                            text: `𝘾𝘼𝙇𝙄𝘿𝘼𝘿 𝘼𝙇𝙏𝘼\n\n𝚃𝚒𝚝𝚞𝚕𝚘: ${title}`
                                        }),
                                        header: proto.Message.InteractiveMessage.Header.fromObject({
                                            hasMediaAttachment: true,
                                            videoMessage: hdVideoMessage
                                        }),
                                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                            buttons: []
                                        })
                                    },
                                    {
                                        body: proto.Message.InteractiveMessage.Body.fromObject({
                                            text: null
                                        }),
                                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                            text: `𝘾𝘼𝙇𝙄𝘿𝘼𝘿 𝘽𝘼𝙅𝘼\n\n𝚃𝚒𝚝𝚞𝚕𝚘: ${title}`
                                        }),
                                        header: proto.Message.InteractiveMessage.Header.fromObject({
                                            hasMediaAttachment: true,
                                            videoMessage: sdVideoMessage
                                        }),
                                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                            buttons: []
                                        })
                                    }
                                ]
                            })
                        })
                    }
                }
            },
            { quoted: message }
        );

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

    } catch (error) {
        await conn.reply(message.chat, error.toString(), message);
    }
};

handler.help = ['facebookdl <url>'];
handler.tags = ['downloader'];
handler.command = ['facebook', 'fbdl', 'fb'];

export default handler;
