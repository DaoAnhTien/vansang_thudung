// Cấu hình thông báo
// Thay đổi các giá trị này với thông tin của bạn

export const NOTIFICATION_CONFIG = {
  // Messenger: Nhập username Facebook của bạn (ví dụ: "yourname" cho m.me/yourname)
  // Hoặc Page ID nếu bạn có Facebook Page
  messengerUsername: "", // Ví dụ: "yourname" hoặc "123456789" (Page ID)
  
  // Email: Email để nhận thông báo RSVP
  notificationEmail: "", // Ví dụ: "your-email@gmail.com"
  
  // Telegram Bot (tùy chọn): Nếu bạn muốn dùng Telegram
  telegramBotToken: "", // Token từ @BotFather
  telegramChatId: "", // Chat ID của bạn
};

// Hàm tạo link Messenger với message đã điền sẵn
export const createMessengerLink = (message: string): string => {
  const username = NOTIFICATION_CONFIG.messengerUsername;
  if (!username) return "";
  
  // Nếu là số (Page ID), dùng format khác
  if (/^\d+$/.test(username)) {
    return `https://m.me/${username}?text=${encodeURIComponent(message)}`;
  }
  
  return `https://m.me/${username}?text=${encodeURIComponent(message)}`;
};

// Hàm gửi email notification (cần EmailJS hoặc service tương tự)
export const sendEmailNotification = async (rsvpData: {
  name: string;
  status: string;
  message: string;
}) => {
  const email = NOTIFICATION_CONFIG.notificationEmail;
  if (!email) return false;
  
  // TODO: Implement email sending với EmailJS hoặc service khác
  // Ví dụ với EmailJS:
  // await emailjs.send('service_id', 'template_id', {
  //   to_email: email,
  //   subject: 'Có RSVP mới',
  //   message: `Tên: ${rsvpData.name}\nTrạng thái: ${rsvpData.status}\nLời nhắn: ${rsvpData.message}`
  // });
  
  return false;
};
