#### **张旋的issue**

----

1. 小程序数据库只能进行读操作，却不能进行增删改。

​    解决方案：本地函数只拥有对数据库的查询权限，需要更细完善云函数来对数据库进行操作。

```javascript
// runDB云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const targetDB = db.collection(event.db)
  try {
    if (event.type == "insert") {
      return await targetDB.add({
        data: event.data
      })
    }

    if (event.type == "update") {
      return await targetDB.doc(event.indexKey).update({
        data: event.data
      })
    }

    if (event.type == "delete") {
      return await targetDB.where(event.condition).remove()
    }

    if (event.type == "get") {
      return await targetDB.where(event.condition)
        .skip(event.limit * event.skip)
        .limit(event.limit)
        .get()
    }
  } catch (e) {
    console.error(e)
  }
}

```

上述代码是对数据库操作的云函数。