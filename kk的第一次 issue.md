## *kk的第一次 issue*

#### 1.wxml中组件的覆盖

​        在login页面中通过<img>组件放入了一张背景图片，想在上面覆盖一个<text>组件，但<text>组件总是显示在图片的下一行。

​        解决方法：将<text>组件的（css）样式表中设置 ```position: absolute;```。生成绝对定位元素，通过left、right、top来设置位置。





 