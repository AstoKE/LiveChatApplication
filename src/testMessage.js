const messageService = require("./services/messageService");
const userService = require("./services/userService");
const { sequelize } = require("./models");

async function test() {
  try {
    await sequelize.sync();

    const user = await userService.createUser({
      username: "message_test_user_" + Date.now(),
    });
    console.log("Kullanıcı oluşturuldu:", user.dataValues);

    const msg1 = await messageService.createMessage({
      userId: user.id,
      content: "Merhaba, bu ilk test mesajı",
    });

    const msg2 = await messageService.createMessage({
      userId: user.id,
      content: "2. Mesaj",
    });

    console.log("Mesaj 1:", msg1.dataValues);
    console.log("Mesaj 2:", msg2.dataValues);

    const userMessages = await messageService.getMessagesByUser(user.id);
    console.log(
      "Kullanıcının tüm mesajları:",
      userMessages.map((m) => m.dataValues)
    );

    const allMessages = await messageService.getAllMessages();
    console.log(
      "DB'deki tüm mesajlar:",
      allMessages.map((m) => m.dataValues)
    );

    await sequelize.close();
  } catch (err) {
    console.error("Test hatası:", err);
  }
}

test();