import { transporter } from "../config/nodeMailer.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";


export const sendEmail = asyncHandler(async (req, res) => {

  const { to, subject , massage } = req.body
  
  console.log(to, subject, massage)
  try {
    const mailOption = {
      from: "bveee369@gmail.com",
      to,
      subject,
      text: massage,
    }

    const mail = await transporter.sendMail(mailOption);
    console.log("work")
    res.status(200).json({
      massage: "Email send successfully",
      success: true
    })
  } catch (error) {

    res.status(500).json({
      massage: "Email sending failled",
      success: false
    })
  }

})