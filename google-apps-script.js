// =============================================
// GOOGLE APPS SCRIPT - CMS + Form Handler
// =============================================
// Tạo 5 tab trong Google Sheets:
//   "Liên hệ"  → Thời gian | Họ tên | Email | SĐT | Nhu cầu
//   "Bảng giá" → Tên gói | Giá | Ghi chú | Phổ biến | Nút bấm | Tính năng
//   "So sánh"  → Tính năng | Starter | Professional | Enterprise
//   "Lợi ích"  → Icon | Tiêu đề | Mô tả
//   "FAQ"      → Câu hỏi | Trả lời
//
// Deploy: Extensions → Apps Script → Deploy → Web app → Anyone
// Copy URL → paste vào script.js
// =============================================

var EMAIL_NHAN = "email-khach-hang@gmail.com";

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var result = {};

    // Đọc Bảng giá
    var ps = ss.getSheetByName("Bảng giá");
    if (ps) {
      var pd = ps.getDataRange().getValues();
      result.pricing = [];
      for (var i = 1; i < pd.length; i++) {
        if (pd[i][0] === "") continue;
        result.pricing.push({
          name: pd[i][0], price: pd[i][1], note: pd[i][2],
          popular: pd[i][3], button: pd[i][4], features: pd[i][5]
        });
      }
    }

    // Đọc So sánh
    var cs = ss.getSheetByName("So sánh");
    if (cs) {
      var cd = cs.getDataRange().getValues();
      result.compare = [];
      for (var j = 1; j < cd.length; j++) {
        if (cd[j][0] === "") continue;
        result.compare.push({
          feature: cd[j][0], starter: cd[j][1],
          pro: cd[j][2], enterprise: cd[j][3]
        });
      }
    }

    // Đọc Lợi ích
    var bs = ss.getSheetByName("Lợi ích");
    if (bs) {
      var bd = bs.getDataRange().getValues();
      result.benefits = [];
      for (var b = 1; b < bd.length; b++) {
        if (bd[b][0] === "") continue;
        result.benefits.push({
          icon: bd[b][0], title: bd[b][1], desc: bd[b][2]
        });
      }
    }

    // Đọc FAQ
    var fs = ss.getSheetByName("FAQ");
    if (fs) {
      var fd = fs.getDataRange().getValues();
      result.faq = [];
      for (var k = 1; k < fd.length; k++) {
        if (fd[k][0] === "") continue;
        result.faq.push({ question: fd[k][0], answer: fd[k][1] });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Liên hệ") || ss.getActiveSheet();

    sheet.appendRow([
      new Date().toLocaleString("vi-VN"),
      data.name, data.email, data.phone, data.message
    ]);

    MailApp.sendEmail(EMAIL_NHAN,
      "🔔 Khách hàng mới từ Landing Page n8n",
      "👤 " + data.name + "\n📧 " + data.email +
      "\n📱 " + data.phone + "\n📝 " + (data.message || "Không có")
    );

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
