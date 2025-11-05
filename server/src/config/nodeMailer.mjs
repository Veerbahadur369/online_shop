import mail from "nodemailer"

// const pas='lmdf ezsp drxo tmkg'
 export const transporter = mail.createTransport({
    service: "gmail",
    secure:true,
    auth: {
        user: "bveee369@gmail.com",
        pass: "lmdfezspdrxotmkg"
    }
});
 