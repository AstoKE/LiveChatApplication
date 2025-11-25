const userService = require("./services/userService");
const { sequelize } = require("./models");

async function test() {
  try {
    // DB bağlantısını başlat
    await sequelize.sync();

    // Kullanıcı ekleyelim
    const user = await userService.createUser({ username: "enestest" });
    console.log("Yeni kullanıcı oluşturuldu:", user.dataValues);

    // Tüm kullanıcıları çekelim
    const allUsers = await userService.getUsers();
    console.log("Tüm kullanıcılar:", allUsers.map(u => u.dataValues));

    // Bağlantıyı kapat
    await sequelize.close();
  } catch (err) {
    console.error("Test hatası:", err);
  }
}

test();