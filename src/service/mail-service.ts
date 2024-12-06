import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";
import * as fs from "fs";
import { attachments } from "../templates/images/attachments";

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
            const filePath = path.resolve(__dirname, "../templates/forgot-password/index.html");
            let htmlContent = fs.readFileSync(filePath, "utf8");
            htmlContent = htmlContent.replace(/{{myverifyLink}}/g, link);
            
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Activate your account on Bunty9`,
                text: "",

                html: htmlContent,
                attachments: attachments,

            });
        } catch (error) {
            // console.error("Error sending activation email:", error);
            throw new Error("Failed to send activation email");
        }
    }
    async sendPasswordResetMail(to: string, link: string): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, "../templates/forgot-password/index.html");
            let htmlContent = fs.readFileSync(filePath, "utf8");
            htmlContent = htmlContent.replace(/{{myforgotPasswordLink}}/g, link);
            
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Change Password to your account on Bunty9`,
                text: "",

                html: htmlContent,
                attachments: attachments,

            });
        } catch (error) {
            // console.error("Error sending forgot password email:", error);
            throw new Error("Failed to send forgot password email");
        }
    }
}

export default new MailService();
