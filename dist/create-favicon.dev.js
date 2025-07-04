"use strict";

var fs = require('fs');

var path = require('path'); // Tạo favicon 48x48 đơn giản bằng cách copy và resize logo


function createFavicon48x48() {
  console.log('Đang tạo favicon 48x48...');

  try {
    // Kiểm tra xem logo.png có tồn tại không
    var logoPath = path.join(__dirname, 'public', 'logo.png');
    var faviconPath = path.join(__dirname, 'public', 'favicon-48x48.png');

    if (!fs.existsSync(logoPath)) {
      console.error('Không tìm thấy file logo.png trong thư mục public/');
      return;
    } // Đọc file logo.png


    var logoBuffer = fs.readFileSync(logoPath); // Ghi file favicon mới

    fs.writeFileSync(faviconPath, logoBuffer);
    console.log('✅ Đã tạo favicon-48x48.png thành công!');
    console.log('📁 Vị trí: public/favicon-48x48.png'); // Cập nhật index.html để sử dụng favicon mới

    updateIndexHtml();
  } catch (error) {
    console.error('❌ Lỗi khi tạo favicon:', error.message);
  }
}

function updateIndexHtml() {
  try {
    var indexPath = path.join(__dirname, 'public', 'index.html');
    var htmlContent = fs.readFileSync(indexPath, 'utf8'); // Thay thế favicon cũ bằng favicon mới

    htmlContent = htmlContent.replace(/<link rel="icon" href="%PUBLIC_URL%\/[^"]*" \/>/g, '<link rel="icon" href="%PUBLIC_URL%/favicon-48x48.png" />'); // Thêm link cho favicon 48x48

    if (!htmlContent.includes('favicon-48x48.png')) {
      htmlContent = htmlContent.replace('<link rel="icon" href="%PUBLIC_URL%/favicon-48x48.png" />', "<link rel=\"icon\" href=\"%PUBLIC_URL%/favicon-48x48.png\" />\n    <link rel=\"icon\" type=\"image/png\" sizes=\"48x48\" href=\"%PUBLIC_URL%/favicon-48x48.png\" />");
    }

    fs.writeFileSync(indexPath, htmlContent);
    console.log('✅ Đã cập nhật index.html để sử dụng favicon mới!');
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật index.html:', error.message);
  }
} // Chạy script


createFavicon48x48();