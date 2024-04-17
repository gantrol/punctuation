# 清理中文中的英文标点

中文里用了一堆英文标点，你遇到过这种情况吗？有些 OCR 容易这样，Claude 3 也容易这样。[这个服务](https://p.gantrol.com)就用于处理这个问题

常用需要替换的符号是：`...`，`.`，`,`，`?`，`!`，`:`，`;`，`'`，`"`，`[`，`]`，`(`，`)`。

打个比方：

```markdown
有人说过: 那是最美好的时代,那是最糟糕的时代;那是睿智的年月,那是萌妹的年月;那是信心百倍的时期,那是疑虑重重的时期;那是阳光...
```

需要转为：

```markdown
有人说过：那是最美好的时代，那是最糟糕的时代；那是睿智的年月，那是萌妹的年月；那是信心百倍的时期，那是疑虑重重的时期；那是阳光……
```

> 我知道“萌妹”应该是“蒙昧”，但这段是某度知道摘抄下来的，标点恰好全是英文，原汁原味坚决不改

特别地，Claude 2需要替换 `,`，`?`，`!`，`:`，`;`，`“`，`”`，`(`，`)`。

当然，有的英文标点是不需要转化的，比如：

```markdown
1. 一行白鹭
2. 两只黄鹂

abc@example.com

J.K. rowling

$$ y = f(x) $$

for (int i = 0; i < 10; i++)
```

> 注意：目前的替换逻辑比较简单，有一些边角场景是不管用的。如果这种服务的需求旺盛，后续可以考虑用机器学习模型持续优化，但正确率也不会达到 100%

## API

地址: https://p.gantrol.com/api/2zh

POST方式发送JSON：

```json
{
  "text": "有人说过:那是最美好的时代,那是最糟糕的时代;那是睿智的年月,那是萌妹的年月;那是信心百倍的时期,那是疑虑重重的时期;那是阳光...",
  "items": [".", ",", ":", ";", "...", ")", "(", "[", "]", "{", "}", "?", "!", "-", "\"", "'"]
}
```

返回：

```json
{
  "result": "有人说过：那是最美好的时代，那是最糟糕的时代；那是睿智的年月，那是萌妹的年月；那是信心百倍的时期，那是疑虑重重的时期；那是阳光……"
}
```

或者使用`mode`：

```json
{
  "text": "有人说过:那是最美好的时代,那是最糟糕的时代;那是睿智的年月,那是萌妹的年月;那是信心百倍的时期,那是疑虑重重的时期;那是阳光...",
  "mode":"all"
}
```

`mode`有`all`与`claude`两种，与界面按钮对应。
