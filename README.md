# instantSearchBox
即时搜索提示框的简单实现（腾讯2017实习生招聘的一道题）
# 基本要求
实现一个类似百度搜索框的关键词提示功能，限时45分钟，越完善越好。
# 基本思路
百度的搜索提示大家肯定都见过，基本功能就是如下几点：
* 输入关键词自动匹配相关热词，有匹配时展示匹配框无则不展示
* 在动态改变关键词时，能够自动触发匹配
* 在有多个匹配项时可以通过键盘上下键控制选中的匹配项，同时此项显示在搜索框中，但是不会根据此项内容触发匹配

功能出来了，问题也就随之出来了，主要要考虑一下几个问题：
* 匹配的规则是怎样，用什么方式匹配？
> 毫无疑问，匹配的方式肯定使用正则表达式。

* 关键词改变时，触发重新匹配的时机是什么时候？
> 很显然，这里只要通过用户手动输入对关键词进行改变就需要出发重新匹配，所以我用了onKeyUp事件，当用户的按键不是上下方向键时，就触发重新匹配。

基本思路出来了，写代码就很容易了。但是很容易发现，这个简陋的不能再简陋的搜索提示框，真是Bug多多啊。不如不支持IE8及以下浏览器，无法响应复制粘贴操作对关键词的改变，匹配的规则千奇百怪等等。

其实还有很多地方需要完善，比如：
* 正则匹配的规则
> 有一个关键字的时候很好说，只要匹配到此字符都可以认为匹配成功；但是关键词有多个字符的时候，应该怎么办呢？是需要匹配到所有字符才算匹配成功还是匹配到任意字符就算匹配成功，还是对匹配的字符进行计数，依次根据匹配到字符数量来展示匹配项呢？实际的搜索引擎，在匹配之前会有一个很强大的分词系统对关键词进行分词，再根据不同的分词以及顺序等信息进行匹配，是非常复杂的。但是在这里，尽可能多的考虑几种匹配情况，就是一个很好的尝试，也是对自己能力的一种展示。

* 兼容性
>  因为代码中用了addEventListener所以导致了IE8及以下的浏览器不支持，应该写一下IE8及以下的Hack代码，事件绑定应该是attachEvent。

* 触发匹配的时机
> 上面说过了，用onKeyUp做事件监听，有很多问题。比如需要监听全局的键盘事件，无法响应复制粘贴改变关键词时的动作，也无法响应在中英文输入法使用shift上屏时的改变关键词的动作，其实更好的解决方案是用HTML5中onInput事件，可以在输入框内容改变时触发，而不论改变的方式。同样的在IE浏览器中就有onPropertyChange事件有相同的效果。

其实只有45分钟，很多人可能都没法做的很完善，但是这是一个很好的题目，考察多方面的能力，下去可以好好实现一下。
