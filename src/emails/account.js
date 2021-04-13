
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'reidefford@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to reid'd program ${name}`
    })
}
const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'reidefford@gmail.com',
        subject: 'Goodbye',
        text: `Goodbye ${name}, thanks for joining. We will miss you.`
    })
}

// sgMail.send({
//     to: 'reidefford@gmail.com',
//     from: 'reidefford@gmail.com',
//     subject: 'first creation',
//     text: 'hope this works'
// })

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
