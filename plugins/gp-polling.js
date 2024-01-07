let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    // Split the message text using the '|' character and slice the array to remove the first element.
    let a = text.split("|").slice(1)
    if (!a[1]) throw "Formato\n" + usedPrefix + command + " hola |si|no"
    if (a[12]) throw "Demasiadas opciones, Formato\n" + usedPrefix + command + " hola |si|no"
    // Check for duplicate options in the poll.
    if (checkDuplicate(a)) throw "Opciones duplicadas en el mensaje.!"
    let cap = "*Solicitud de sondeo por* " + m.name + "\n*Mensaje:* " + text.split("|")[0]

   
    const pollMessage = {
        name: cap,
        values: a,
        multiselect: false,
        selectableCount: 1
    }
  
    await conn.sendMessage(m.chat, {
        poll: pollMessage
    })
}

handler.help = ["poll question|option|option"]
handler.tags = ["group"]
handler.command = /^po(l((l?ing|ls)|l)|ols?)$/i

export default handler

// Function to check for duplicate elements in an array.
function checkDuplicate(arr) {
    return new Set(arr).size !== arr.length
}
