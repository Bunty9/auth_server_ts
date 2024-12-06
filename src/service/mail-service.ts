import nodemailer, { Transporter } from "nodemailer";

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
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Activate your account on ${process.env.ACTIVATE_API_URL}`,
                text: "",
                html: `
                    <div>
                        <h1>To activate your account, click this link:</h1>
                        <a href="${link}">${link}</a> 
                    </div>   
                `,
            });
        } catch (error) {
            console.error("Error sending activation email:", error);
            throw new Error("Failed to send activation email");
        }
    }
}

export default new MailService();
