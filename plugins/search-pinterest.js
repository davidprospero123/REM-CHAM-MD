// ESTE CODIGO FUE ECHO POR GABRIEL CURI, SI VAS USARLO DAME CREDITOS CRACK SALUDOS
import axios from 'axios';
const baileys = (await import("@whiskeysockets/baileys")).default;
const { proto } = baileys;
const { generateWAMessageFromContent } = baileys;
const { generateWAMessageContent } = baileys;

let handler = async (message, { conn, text }) => {
    if (!text) {
        return conn.reply(message.chat, ' *¿Qué término de búsqueda quieres usar para encontrar imágenes en Pinterest?*', message);
    }

    async function createImageMessage(url) {
        const { imageMessage } = await generateWAMessageContent(
            { image: { url } },
            { upload: conn.waUploadToServer }
        );
        return imageMessage;
    }

    try {
        const { data: response } = await axios.get(`https://rembotapi.vercel.app/api/pinterest?text=${encodeURIComponent(text)}`);

        if (!response.success || !Array.isArray(response.images)) {
            return conn.reply(message.chat, ' *No se encontraron imágenes o el formato de respuesta es inválido.*', message);
        }
        let images = response.images.map(img => img.imageUrl); 
        if (images.length < 5) {
            images = [...images, ...Array(5 - images.length).fill('')]; 
        } else {
            images = images.slice(0, 7); 
        }
        const imageMessages = await Promise.all(images.filter(url => url).map(createImageMessage)); 

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
                                text: ' `𝙋𝙄𝙉𝙏𝙀𝙍𝙀𝙎𝙏`'
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: 'REM CHAM BOT',
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: imageMessages.map((imgMessage, index) => ({
                                    body: proto.Message.InteractiveMessage.Body.fromObject({
                                        text: null
                                    }),
                                    footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                        text: `𝙄𝙈𝘼𝙂𝙀𝙉 ${index + 1}`
                                    }),
                                    header: proto.Message.InteractiveMessage.Header.fromObject({
                                        hasMediaAttachment: true,
                                        imageMessage: imgMessage
                                    }),
                                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                                        buttons: []
                                    })
                                }))
                            })
                        })
                    }
                }
            },
            { quoted: message }
        );
        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

    } catch (error) {
        await conn.reply(message.chat, `Error: ${error.message}`, message);
    }
};
handler.help = ['pinterest <text>'];
handler.tags = ['search'];
handler.command = ['pinterest', 'pins'];

export default handler;
