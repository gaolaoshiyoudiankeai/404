#### **张旋的第四个issue

----

##### 1.当数据库缺少最晚一天的预约信息时，如何实现自增初始化

解决方案：

```javascript
//如果数据库中没有后天这条记录，初始化后天记录，并添加到数据库中
    if(tdat.data.length==0){
      var _ord=[1,1,1,1,1,1,1,1];
      wx.cloud.callFunction({
        name: "subord",
        data: {
          type: "insert", //指定操作是insert  
          db: "situation", //指定操作的数据表
          data: {
            order:_ord,
            date: this.getDateStr('', 2, 0),
          }
        },
        success: function (res) {
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
    
    //重新获取后天信息
    tdat = await db.collection('situation').where({
      date: this.getDateStr('', 2, 0)
    })
      .get();

```

