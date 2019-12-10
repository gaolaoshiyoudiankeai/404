#### **张旋的第二个issue** ####

----

##### 1.本地更新完后的云函数无法调用

解决方案：云函数需要先部署到云端，并且安装依赖。

在cloud functions右键选择新建云函数，在新建的云函数文件夹里编写index文件，在index文件能实现所需要的功能。点击上传，将云函数部署到云端。

##### 2.界面跳转时页面间数据的传递

解决方案：

```javascript
if(password==user.data[0].password)
        wx.switchTab({
          url: '../index/index?id='+this.data.id,
          
        })
```

在将要跳转的界面的JS文件内加上述代码，通过url实现界面间的数据传递。

```javascript
 onLoad:function(options){
    this.getsu();
    this.setData({
      userid:options.id
    })
 },
```

在要跳转到的目标界面JS内添加上述代码，将值赋给对应变量。