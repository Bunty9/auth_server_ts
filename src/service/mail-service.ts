import nodemailer, { Transporter } from "nodemailer";
import { verify_emailTemplate } from "../templates/verify_email";
import * as path from "path";
import * as fs from "fs";

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            host: process.env.SMTP_HOST as string,
            port: parseInt(process.env.SMTP_PORT as string, 10) || 587, // Default to 587 if port is undefined
            secure: false, // Set to true if using SSL/TLS
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASSWORD as string,
            },
        });
    }

    async sendActivationMail(to: string, link: string): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, "../templates/verify-email/index.html");
            let htmlContent = fs.readFileSync(filePath, "utf8");
            htmlContent = htmlContent.replace(/{{myverifyLink}}/g, link);
            const attachments = [
                {
                    filename: "1.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/1.png"), // Path to the image
                    cid: "logo1", // Content-ID referenced in the HTML
                },
                {
                    filename: "2.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/2.png"), // Path to the image
                    cid: "logo2", // Content-ID referenced in the HTML
                },
                {
                    filename: "3.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/3.png"), // Path to the image
                    cid: "logo3", // Content-ID referenced in the HTML
                },
                {
                    filename: "4.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/4.png"), // Path to the image
                    cid: "logo4", // Content-ID referenced in the HTML
                },
                {
                    filename: "5.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/5.png"), // Path to the image
                    cid: "logo5", // Content-ID referenced in the HTML
                },
                {
                    filename: "6.png", // Name of the file
                    path: path.resolve(__dirname, "../templates/verify-email/images/6.png"), // Path to the image
                    cid: "logo6", // Content-ID referenced in the HTML
                },
            ];
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Activate your account on Bunty9`,
                text: "",

                html: htmlContent,
                attachments: attachments,

            });
        } catch (error) {
            console.error("Error sending activation email:", error);
            throw new Error("Failed to send activation email");
        }
    }
}

export default new MailService();
