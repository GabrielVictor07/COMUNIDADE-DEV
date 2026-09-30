export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/recuperar-senha/${token}`;

  console.log("=========================================");
  console.log(`[E-MAIL SIMULADO] Recuperação de Senha`);
  console.log(`Para: ${email}`);
  console.log(`Link: ${resetLink}`);
  console.log("=========================================");

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Comunidade Dev <onboarding@resend.dev>",
          to: email,
          subject: "Recuperação de Senha - Comunidade Dev",
          html: `
            <h1>Recuperação de Senha</h1>
            <p>Você solicitou a redefinição da sua senha.</p>
            <p>Clique no link abaixo para criar uma nova senha:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
          `,
        }),
      });
      if (!res.ok) {
        console.error("Erro ao enviar email pelo Resend:", await res.text());
      }
    } catch (error) {
      console.error("Exceção ao enviar email:", error);
    }
  } else {
    console.warn("RESEND_API_KEY não configurada. O email foi apenas logado no terminal.");
  }
}
