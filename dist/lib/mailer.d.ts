export interface MailOptions {
    to: string;
    subject: string;
    html: string;
}
export declare function sendMail(options: MailOptions): Promise<void>;
//# sourceMappingURL=mailer.d.ts.map