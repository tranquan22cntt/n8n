# Hướng dẫn chỉnh sửa nội dung Landing Page n8n

## Cách hoạt động
Nội dung trang web được lấy từ **Google Sheets**. Bạn chỉ cần mở Google Sheets, sửa nội dung → trang web tự cập nhật.

---

## Cấu trúc Google Sheets

### Tab 1: "Bảng giá"
| Tên gói | Giá | Ghi chú | Phổ biến | Nút bấm | Tính năng |
|---------|-----|---------|----------|---------|-----------|
| Starter | 1.900.000đ/tháng | Trọn gói – bao gồm hạ tầng & hỗ trợ | Không | Đăng ký | 10 workflow hoạt động\|2.500 execution/tháng\|AI Agent cơ bản (GPT, Gemini)\|Hỗ trợ qua email tiếng Việt\|Sao lưu dữ liệu tự động |
| Professional | 4.900.000đ/tháng | Trọn gói – bao gồm hạ tầng & hỗ trợ ưu tiên | Có | Đăng ký | 50 workflow hoạt động\|15.000 execution/tháng\|AI Agent nâng cao – xây dựng riêng\|Hỗ trợ kỹ thuật ưu tiên 24/7 |
| Enterprise | Liên hệ | Hạ tầng riêng – tùy chỉnh toàn diện | Không | Liên hệ | Không giới hạn workflow\|Execution theo nhu cầu\|AI Agent tùy chỉnh chuyên sâu\|SLA cam kết uptime 99.9% |

> **Lưu ý**: Cột "Tính năng" dùng dấu `|` để phân cách các tính năng. Cột "Phổ biến" ghi "Có" hoặ"Không".

### Tab 2: "So sánh"
| Tính năng | Starter | Professional | Enterprise |
|-----------|---------|-------------|------------|
| Số workflow | 10 | 50 | Không giới hạn |
| Execution mỗi tháng | 2.500 | 15.000 | Theo nhu cầu |
| AI Agent | Cơ bản | Nâng cao | Tùy chỉnh riêng |
| Hỗ trợ kỹ thuật | Email | Ưu tiên | Riêng cho doanh nghiệp |

### Tab 3: "Lợi ích"
| Icon | Tiêu đề | Mô tả |
|------|---------|-------|
| 🔗 | Kết nối hơn 1000 ứng dụng | Kết nối CRM, Google Sheet, Email Marketing, Zalo, Slack, API và nhiều nền tảng khác. |
| ⚙️ | Tự động hóa quy trình | Tự động xử lý dữ liệu, gửi email, cập nhật khách hàng và tạo báo cáo định kỳ. |
| 🤖 | Tích hợp AI Agent | Kết hợp AI để phân tích dữ liệu, trả lời khách hàng và hỗ trợ ra quyết định nhanh hơn. |
| ⏱️ | Tiết kiệm thời gian | Giảm thao tác thủ công, giúp đội ngũ tập trung vào công việc quan trọng hơn. |
| 💰 | Giảm chi phí nhân sự | Tối ưu nguồn lực bằng cách tự động hóa các tác vụ lặp lại hằng ngày. |
| 📊 | Dễ theo dõi hiệu quả | Theo dõi workflow, execution và hiệu quả vận hành qua hệ thống rõ ràng. |

> **Lưu ý**: Cột "Icon" chỉ cần paste 1 emoji vào ô.

### Tab 4: "FAQ"
| Câu hỏi | Trả lời |
|---------|---------|
| n8n là gì? | n8n là nền tảng tự động hóa workflow... |
| Gói Starter phù hợp với ai? | Gói Starter phù hợp với cá nhân... |

### Tab 5: "Liên hệ" (tự động điền khi khách gửi form)
| Thời gian | Họ tên | Email | SĐT | Nhu cầu |

---

## Cách chỉnh sửa

1. Mở Google Sheets
2. Chọn tab cần sửa (Bảng giá / So sánh / FAQ)
3. Sửa nội dung trực tiếp trong ô
4. Trang web sẽ tự cập nhật khi tải lại (F5)

### Ví dụ: Thay đổi giá
- Mở tab "Bảng giá" → sửa ô cột "Giá" → xong!

### Ví dụ: Thêm câu hỏi FAQ
- Mở tab "FAQ" → thêm 1 hàng mới → điền Câu hỏi và Trả lời → xong!

### Ví dụ: Thêm gói giá mới
- Mở tab "Bảng giá" → thêm 1 hàng mới → điền đầy đủ 6 cột → xong!
