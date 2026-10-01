// A+ Campus Helping Bot
// Cloudflare Worker + Telegram Bot API

const MENU = {
  keyboard: [
    ["✅Register✅"],
    ["⚠️ እንዴት ልመዝግብ ⁉️"],
    ["🔑ብመዘግብ ምን እጠቀማለሁ? 🤔"],
    ["📖Sample ለማየት👀"],
    ["🏛About us", "☎️Contact us"]
  ],
  resize_keyboard: true,
  one_time_keyboard: false
};

const SCIENCE_MENU = {
  keyboard: [
    ["🔵 Natural Science"],
    ["🟢 Social Science"],
    ["🔙 Back"]
  ],
  resize_keyboard: true
};

const SAMPLE_MENU = {
  keyboard: [
    ["📘 HTML Note Sample"],
    ["📄 DOCX Sample"],
    ["📝 Text Sample"],
    ["🔙 Back"]
  ],
  resize_keyboard: true
};

async function telegram(method, data, env) {
  const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

async function sendMessage(chatId, text, env, extra = {}) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra
  }, env);
}

async function start(chatId, env) {
  const text = `
<b>🎓 Welcome to A+ Campus!</b>

📚 <b>A+ Campus Tutorial Class</b>

Freshman students' learning, preparation and academic support platform.

እንኳን ወደ <b>A+ Campus</b> በደህና መጡ! 🎉

ከታች ካሉት አማራጮች የፈለጉትን ይምረጡ። 👇
`;

  return sendMessage(chatId, text, env, {
    reply_markup: MENU
  });
}

async function howToRegister(chatId, env) {
  const text = `
<b>⚠️ እንዴት ልመዝግብ ⁉️</b>

1️⃣ <b>Register</b> የሚለውን ይጫኑ።

2️⃣ የሚማሩበትን stream ይምረጡ።
🔵 Natural Science
🟢 Social Science

3️⃣ የክፍያ መረጃውን ይከተሉ።

4️⃣ ክፍያውን ከፈጸሙ በኋላ receipt/screenshot ይላኩ። 📸

5️⃣ አስተዳደሩ ካረጋገጠ በኋላ የPrivate Tutorial Class መግቢያ link ይላክልዎታል። 🔐

💰 <b>First Semester = 300 ETB</b>
❌ Monthly payment የለም።
`;

  return sendMessage(chatId, text, env, {
    reply_markup: MENU
  });
}

async function whatYouGet(chatId, env) {
  const text = `
<b>🔑 ብመዘግብ ምን እጠቀማለሁ? 🤔</b>

🎥 Attractive Video Tutorials

📚 Amharic + English Notes

🖥️ Review Slides

🧠 Mind Maps & Quick Shortcuts

📝 Chapter-wise Quizzes

📋 Online Mid & Final Exams

👥 Experience Sharing

🎯 GPA ለማሻሻል የሚረዱ የጥናት ዘዴዎች

🔥 ዋናው አላማ፦ Freshman students በuniversity life እንዲለምዱ እና ትምህርታቸውን በተሻለ ሁኔታ እንዲከታተሉ መርዳት።
`;

  return sendMessage(chatId, text, env, {
    reply_markup: MENU
  });
}

async function register(chatId, env) {
  return sendMessage(
    chatId,
    `<b>📚 የትኛውን stream ትማራለህ?</b>\n\nከታች ካሉት አንዱን ምረጥ 👇`,
    env,
    { reply_markup: SCIENCE_MENU }
  );
}

async function payment(chatId, stream, env) {
  const text = `
<b>✅ ${escapeHtml(stream)}</b>

<b>💰 First Semester Payment: 300 ETB</b>

❌ Monthly payment የለም።

<b>🏦 CBE</b>
Account Number:
<code>1000639662377</code>

Account Name:
<b>SIMACHEW GETNET BAZIE</b>

<b>📱 Telebirr</b>
Phone:
<code>0922109350</code>

Name:
<b>SIMACHEW GETNET</b>

━━━━━━━━━━━━━━

ክፍያውን ከፈጸሙ በኋላ፦

📸 <b>Receipt/Screenshot እዚህ ላይ ይላኩ።</b>

Admin ክፍያውን ካረጋገጠ በኋላ Private Class Link ይላክልዎታል። 🔐

☎️ Help:
@Ssmofa
`;

  return sendMessage(chatId, text, env, {
    reply_markup: {
      keyboard: [["🔙 Back"]],
      resize_keyboard: true
    }
  });
}

async function sample(chatId, env) {
  const text = `
<b>📖 A+ Campus Samples</b>

ከታች ካሉት sample ይምረጡ። 👇

📘 HTML Note Sample
📄 DOCX Sample
📝 Text Sample
`;

  return sendMessage(chatId, text, env, {
    reply_markup: SAMPLE_MENU
  });
}

async function htmlSample(chatId, env) {
  return sendMessage(chatId, `
<b>📘 A+ Campus HTML Note Sample</b>

🧠 <b>Psychology — Essence of Psychology</b>

<b>1.1 Definition of Psychology</b>

Psychology is the scientific study of behavior and mental processes.

🇪🇹 <b>በአማርኛ:</b>
Psychology ማለት የሰው ባህሪንና የአእምሮ ሂደቶችን በሳይንሳዊ መንገድ ማጥናት ነው።

⭐ <b>Must Know</b>
Behavior = ባህሪ
Mental Processes = የአእምሮ ሂደቶች
`, env, { reply_markup: SAMPLE_MENU });
}

async function docxSample(chatId, env) {
  return sendMessage(chatId, `
<b>📄 DOCX Sample</b>

📚 A+ Campus notes are prepared in a clean, student-friendly format.

✅ English explanation
🇪🇹 Amharic explanation
⭐ Exam-focused points
📝 Practice questions
`, env, { reply_markup: SAMPLE_MENU });
}

async function textSample(chatId, env) {
  return sendMessage(chatId, `
<b>📝 Text Sample</b>

🔥 <b>Exam Focus</b>

⭐ Definition
⭐ Key concepts
⭐ Important differences
⭐ Examples
⭐ Possible MCQs

<b>A+ Campus</b>
Your learning. Your community. 🎓
`, env, { reply_markup: SAMPLE_MENU });
}

async function aboutUs(chatId, env) {
  return sendMessage(chatId, `
<b>🏛 About A+ Campus</b>

🎓 <b>A+ Campus</b> is a student-focused educational platform.

📚 We provide:
• Freshman-focused tutorials
• Study notes
• Quizzes
• Review materials
• Academic guidance
• Student community support

🤝 Our goal is to help students learn, prepare and support each other throughout their academic journey.

<b>🎓 A+ Campus</b>
`, env, { reply_markup: MENU });
}

async function contactUs(chatId, env) {
  return sendMessage(chatId, `
<b>☎️ Contact A+ Campus</b>

For registration/payment help:

👤 Telegram: @Ssmofa

📱 Phone: 0922109350

🎓 A+ Campus
`, env, { reply_markup: MENU });
}

async function handleReceipt(message, env) {
  const chatId = message.chat.id;
  const user = message.from || {};

  const username = user.username
    ? `@${user.username}`
    : "No username";

  const name = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ") || "Unknown";

  const caption = `
<b>💳 NEW PAYMENT RECEIPT</b>

👤 Name: ${escapeHtml(name)}
🔹 Username: ${escapeHtml(username)}
🆔 User ID: <code>${user.id}</code>
`;

  await telegram("sendPhoto", {
    chat_id: env.ADMIN_ID,
    photo: message.photo[message.photo.length - 1].file_id,
    caption,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Approve",
            callback_data: `approve_${user.id}`
          },
          {
            text: "❌ Reject",
            callback_data: `reject_${user.id}`
          }
        ]
      ]
    }
  }, env);

  await sendMessage(chatId, `
<b>📸 Receipt received successfully! ✅</b>

የክፍያ receiptህ ለAdmin ተልኳል።

⏳ እባክህ ማረጋገጫውን ጠብቅ።

ከተረጋገጠ በኋላ Private Class Link ይላክልሃል። 🔐
`, env);
}

async function handleCallback(query, env) {
  const data = query.data || "";
  const adminId = query.from.id;

  if (String(adminId) !== String(env.ADMIN_ID)) {
    return telegram("answerCallbackQuery", {
      callback_query_id: query.id,
      text: "Unauthorized ❌",
      show_alert: true
    }, env);
  }

  const parts = data.split("_");
  const action = parts[0];
  const userId = parts[1];

  if (action === "approve") {
    await sendMessage(Number(userId), `
<b>✅ Payment Approved!</b>

ክፍያህ ተረጋግጧል። 🎉

🎓 <b>A+ Campus Tutorial Class</b>

ከታች ያለውን Private Class Link ተጠቀም። 👇

🔐 ${escapeHtml(env.PRIVATE_CLASS_LINK)}
`, env);

    await telegram("answerCallbackQuery", {
      callback_query_id: query.id,
      text: "Payment approved ✅"
    }, env);

    return editAdminMessage(query, "✅ PAYMENT APPROVED");
  }

  if (action === "reject") {
    await sendMessage(Number(userId), `
<b>❌ Receipt Rejected</b>

የላክከው receipt ግልጽ አይደለም ወይም ማረጋገጥ አልተቻለም።

📸 እባክህ ግልጽ የሆነ receipt screenshot እንደገና ላክ።
`, env);

    await telegram("answerCallbackQuery", {
      callback_query_id: query.id,
      text: "Receipt rejected ❌"
    }, env);

    return editAdminMessage(query, "❌ PAYMENT REJECTED");
  }
}

async function editAdminMessage(query, status) {
  const message = query.message;

  if (!message) return;

  return telegram("editMessageCaption", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    caption: `${message.caption || ""}\n\n<b>${status}</b>`,
    parse_mode: "HTML"
  }, globalThis.__ENV__);
}

async function handleText(message, env) {
  const chatId = message.chat.id;
  const text = message.text || "";

  if (text === "/start") {
    return start(chatId, env);
  }

  if (text === "✅Register✅") {
    return register(chatId, env);
  }

  if (text === "⚠️ እንዴት ልመዝግብ ⁉️") {
    return howToRegister(chatId, env);
  }

  if (text === "🔑ብመዘግብ ምን እጠቀማለሁ? 🤔") {
    return whatYouGet(chatId, env);
  }

  if (text === "📖Sample ለማየት👀") {
    return sample(chatId, env);
  }

  if (text === "🏛About us") {
    return aboutUs(chatId, env);
  }

  if (text === "☎️Contact us") {
    return contactUs(chatId, env);
  }

  if (text === "🔵 Natural Science") {
    return payment(chatId, "Natural Science", env);
  }

  if (text === "🟢 Social Science") {
    return payment(chatId, "Social Science", env);
  }

  if (text === "📘 HTML Note Sample") {
    return htmlSample(chatId, env);
  }

  if (text === "📄 DOCX Sample") {
    return docxSample(chatId, env);
  }

  if (text === "📝 Text Sample") {
    return textSample(chatId, env);
  }

  if (text === "🔙 Back") {
    return start(chatId, env);
  }

  return sendMessage(
    chatId,
    "እባክዎ ከሚታዩት የMenu አማራጮች ይምረጡ። 👇",
    env,
    { reply_markup: MENU }
  );
}

async function handleUpdate(update, env) {
  globalThis.__ENV__ = env;

  if (update.callback_query) {
    return handleCallback(update.callback_query, env);
  }

  if (!update.message) return;

  if (update.message.photo) {
    return handleReceipt(update.message, env);
  }

  if (update.message.text) {
    return handleText(update.message, env);
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(
        "A+ Campus Bot Worker is running ✅",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=UTF-8"
          }
        }
      );
    }

    if (request.method === "GET" && url.pathname === "/set-webhook") {
      const webhookUrl = `${url.origin}/telegram`;

      const result = await telegram(
        "setWebhook",
        {
          url: webhookUrl
        },
        env
      );

      return Response.json({
        webhook: webhookUrl,
        telegram: result
      });
    }

    if (
      request.method === "POST" &&
      url.pathname === "/telegram"
    ) {
      try {
        const update = await request.json();

        await handleUpdate(update, env);

        return new Response("OK", {
          status: 200
        });
      } catch (error) {
        return new Response("OK", {
          status: 200
        });
      }
    }

    return new Response("Not Found", {
      status: 404
    });
  }
};
