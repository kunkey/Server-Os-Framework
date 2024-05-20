<img src="https://i.pinimg.com/originals/99/49/77/994977c48fde58ac674a2d05ba5a5efb.png" alt="Hexo logo" width="100" height="100" align="right" />

# Server-Os-Core

> Khung ứng dụng nhanh, đơn giản và mạnh mẽ, được hỗ trợ bởi [Node.js](https://nodejs.org).


## Đặc trưng

- Tạo khung ứng dụng cho dự án của bạn nhanh chóng.
- Tối ưu hóa hiệu suất xử lý và mở rộng mô hình.
- Cộng đồng hỗ trợ lớn trên reddit...

## Cấu trúc khung ứng dụng

```
    |-- .env
    |-- package.json
    |-- src
    |   |-- app
    |   |   |-- server.js
    |   |   |-- express.js
    |   |   |-- websocket.js
    |   |   |-- config
    |   |   |   |-- env.js
    |   |   |   |-- lang.js
    |   |   |   |-- cors.js
    |   |   |   |-- lib
    |   |   |   |-- |-- ...library 3rd config here.
    |   |   |-- databases
    |   |   |   |-- mysql.js
    |   |   |   |-- rabbitmq.js
    |   |   |   |-- redis.js
    |   |   |   |-- sequelize
    |   |   |   |   |-- config
    |   |   |   |   |   |-- config.json
    |   |   |   |   |-- seeders
    |   |   |   |   |   |-- ...database seed file here.
    |   |   |-- models
    |   |   |   |-- index.js
    |   |   |   |-- app
    |   |   |   |   |-- user.model.js
    |   |   |   |   |-- book.model.js
    |   |   |   |   |-- association.js
    |   |   |-- controllers
    |   |   |   |-- entry
    |   |   |   |   |-- app
    |   |   |   |   |   |-- callback.controller.js
    |   |   |   |   |   |-- webhook.controller.js
    |   |   |   |-- http
    |   |   |   |   |-- app
    |   |   |   |   |   |-- user.controller.js
    |   |   |   |   |   |-- book.controller.js
    |   |   |   |-- socket
    |   |   |   |   |-- app
    |   |   |   |   |    |-- event.controller.js
    |   |   |   |   |    |-- action.controller
    |   |   |   |   |    |   |-- auth.controller.js
    |   |   |   |   |    |   |-- broadcast.controller.js
    |   |   |-- services
    |   |   |   |-- entry
    |   |   |   |   |-- app
    |   |   |   |   |   |-- callback.service.js
    |   |   |   |   |   |-- webhook.service.js
    |   |   |   |-- http
    |   |   |   |   |-- app
    |   |   |   |   |   |-- user.service.js
    |   |   |   |   |   |-- book.service.js
    |   |   |   |-- socket
    |   |   |   |   |-- app
    |   |   |   |   |  |-- broadcast.service.js
    |   |   |-- routers
    |   |   |   |-- index.js
    |   |   |   |-- http.js
    |   |   |   |-- socket.js
    |   |   |   |-- entry
    |   |   |   |   |-- index.js
    |   |   |   |   |-- app
    |   |   |   |   |   |-- callback.router.js
    |   |   |   |   |   |-- webhook.router.js
    |   |   |   |-- http
    |   |   |   |   |-- index.js
    |   |   |   |   |-- app
    |   |   |   |   |   |-- user.router.js
    |   |   |   |   |   |-- book.router.js
    |   |   |-- middwares
    |   |   |   |-- index.js
    |   |   |   |-- app
    |   |   |   |   |-- Auth.middware.js
    |   |   |-- loaders
    |   |   |   |-- index.js
    |   |   |   |-- dbConnection.posts.js
    |   |   |   |-- globalVariables.js
    |   |   |   |-- WebSocket
    |   |   |   |  |-- index.js
    |   |   |   |  |-- app
    |   |   |   |  |   |-- index.js
    |   |   |-- utils
    |   |   |   |-- index.js
    |   |   |   |-- contanst
    |   |   |   |-- errsole
    |   |   |   |-- ip
    |   |   |   |-- jwt
    |   |   |   |-- logger
    |   |   |   |-- response
    |   |   |   |-- string
    |   |   |-- libs
    |   |   |   |-- ...library 3rd here.
    |   |-- storage
    |   |   |-- app
    |   |   |   |-- upload
    |   |   |   |   |-- ...uploaded files here.
    |   |   |   |-- media
    |   |   |   |   |-- ...media files here.
    |   |   |   |-- logs
    |   |   |   |   |-- ...logs files here.
    |   |-- public
    |   |   |-- ...static files here.
    |   |-- views
    |   |   |-- ...template engine render view files here.
```

## Bắt đầu nhanh

**Cài đặt các gói phụ trợ:**

``` bash
$ npm install -g yarn
$ yarn
```

**Cấu hình cơ bản:**
- đổi tên file ```.env.example``` thành ```.env``` và thêm các biến môi trường vào file này.
- tất cả các tệp cấu hình khác đều nằm trong đường dẫn ```src/app/configs```

**Chạy gỡ lỗi hoặc khởi động máy chủ:**
``` bash
$ yarn start
```
``` bash
$ yarn dev
```

**Ghi chú! Dữ liệu khởi tạo:**

- các bảng trong cơ sở dữ liệu được tạo tự động sau khi bạn chạy ứng dụng.
- mô hình và lược đồ được cấu hình tại đường dẫn ```src/app/models```
- để tạo dữ liệu mẫu, bạn phải cài đặt thêm gói phụ trợ ```Squelize-Cli```. 
- ``` $ npm install --save-dev sequelize-cli```
- chỉnh sửa tập tin cấu hình cơ sở dữ liệu tại đường dẫn:
```src/app/databases/squelize/config/config.json```
- cuối cùng để tạo dữ liệu mẫu, chạy câu lệnh:
- ``` $ npx sequelize-cli db:seed:all```

**Xem trước ứng dụng trên trình duyệt:**
``` bash
http://localhost:8009
```

## Các tính năng phụ trợ bổ sung
**Bảng điều khiển nhật ký lỗi: Error Logs!** 
- xem tại trình duyệt http://localhost:8001
- cấu hình các thông số bảng điều khiển tại đường dẫn: ```src/app/configs/lib/errsole/config.js```

## Tác giả
- Duy Luc Vu - Kunkeypr
- Visit My Blog: **[Kunkey.Dev](https://kunkey.dev)**
## Liên hệ và hỗ trợ
- Telegram: https://t.me/bruhh_lmao
- Email: mm13571234@gmail.com